import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir,mkdtemp,writeFile,stat} from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import YAML from 'yaml';
const manifest=JSON.parse(await readFile('plugin.json','utf8'));
test('portable manifest and presentation resolve to actual files',async()=>{
 assert.equal(manifest.$schema,'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json');assert.equal(manifest.name,'cinematic-web-studio');assert.match(manifest.version,/^\d+\.\d+\.\d+$/);assert.equal(manifest.author.name,'Artem Semianyk');
 const ext=manifest.extensions['com.openai'];assert.ok(ext.interface.shortDescription.length<=30);assert.equal(ext.interface.category,'Developer Tools');assert.ok(!manifest.mcpServers&&!ext.apps);
 for(const p of [ext.onboardingSkill,ext.interface.logo,ext.interface.composerIcon]){assert.ok(p.startsWith('./')&&!p.includes('..'));assert.ok((await stat(p)).size>0);}
});
test('all eight skills parse and their local Markdown links resolve',async()=>{
 const dirs=await readdir('skills');assert.equal(dirs.length,8);
 for(const dir of dirs){const file=path.join('skills',dir,'SKILL.md');const text=await readFile(file,'utf8');const fm=YAML.parse(text.split('---')[1]);assert.equal(fm.name,dir);assert.ok(fm.description.length>30);assert.ok(text.length>600);
 for(const ref of text.matchAll(/\.\.\/\.\.\/[\w/.\-]+\.m(?:d|js)/g))await stat(path.resolve(path.dirname(file),ref[0]));}
});
test('GLB has binary geometry and original material meshes',async()=>{
 const b=await readFile('examples/shared/cup.glb');assert.equal(b.toString('ascii',0,4),'glTF');assert.equal(b.readUInt32LE(4),2);assert.equal(b.readUInt32LE(8),b.length);const len=b.readUInt32LE(12);const gltf=JSON.parse(b.toString('utf8',20,20+len));assert.ok(gltf.meshes.length>=4);assert.ok(gltf.accessors.some(a=>a.type==='VEC3'&&a.count>100));assert.ok(!gltf.images?.some(i=>i.uri?.startsWith('http')));
});
test('scaffold creates isolated reusable source and rejects overwrite / injection',async()=>{
 const parent=await mkdtemp(path.join(os.tmpdir(),'cws-'));const dest=path.join(parent,'site');
 const run=(out,brand)=>spawnSync(process.execPath,['scripts/scaffold.mjs','--template','coffee-acceptance','--out',out,'--brand',brand],{encoding:'utf8'});
 assert.equal(run(dest,'<script>alert(1)</script>').status,0);const html=await readFile(path.join(dest,'index.html'),'utf8');assert.ok(!html.includes('<script>alert(1)</script>'));assert.ok(html.includes('&lt;script&gt;'));assert.ok(html.includes('./shared/scene.js'));assert.equal(run(dest,'Again').status,1);
 assert.equal(run(path.resolve('examples/unsafe'),'No').status,1);assert.equal(run(path.join(parent,'second'),'Second brand').status,0);
});
