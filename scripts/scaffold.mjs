import {cp,mkdir,readFile,writeFile,access} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=process.argv.slice(2);const options={};
for(let i=0;i<args.length;i+=2){if(!['--template','--out','--brand'].includes(args[i])||!args[i+1])throw new Error('Usage: --template NAME --out NEW_DIRECTORY [--brand NAME]');options[args[i].slice(2)]=args[i+1];}
const allowed=['cinematic-landing','interactive-3d','scroll-animation','coffee-acceptance'];
if(!allowed.includes(options.template)||!options.out)throw new Error('Choose an existing template and a new output directory.');
const dest=path.resolve(options.out);
if(dest===root||dest.startsWith(root+path.sep))throw new Error('Output must be outside the installed plugin.');
let exists=false;try{await access(dest);exists=true;}catch{}
if(exists)throw new Error('Output already exists; refusing to overwrite.');
const brand=options.brand||'Studio';if(brand.length>80)throw new Error('Brand must be at most 80 characters.');
const escaped=brand.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
await mkdir(dest,{recursive:true});
await cp(path.join(root,'examples/shared'),path.join(dest,'shared'),{recursive:true});
await cp(path.join(root,'assets'),path.join(dest,'assets'),{recursive:true});
let html=await readFile(path.join(root,'examples',options.template,'index.html'),'utf8');
html=html.replaceAll('../shared/','./shared/').replaceAll('../../assets/','./assets/').replaceAll('href="../"','href="./"');
html=html.replace(/Serein|Forma|Aurore|ORBIT/g,escaped).replace('CWS / STUDIES',escaped);
html=html.replaceAll('href="../interactive-3d/"','href="#details"');
await writeFile(path.join(dest,'index.html'),html);
await mkdir(path.join(dest,'scripts'));await cp(path.join(root,'scripts/serve.mjs'),path.join(dest,'scripts/serve.mjs'));
await mkdir(path.join(dest,'tests'));await cp(path.join(root,'tests/browser.mjs'),path.join(dest,'tests/browser.mjs'));
await cp(path.join(root,'LICENSE'),path.join(dest,'LICENSE'));
await writeFile(path.join(dest,'package.json'),JSON.stringify({name:'cinematic-site',version:'0.1.0',private:true,type:'module',scripts:{start:'node scripts/serve.mjs','test:browser':'node tests/browser.mjs'},devDependencies:{playwright:'1.56.1'}},null,2));
await writeFile(path.join(dest,'site.json'),JSON.stringify({template:options.template,brand,createdBy:'Cinematic Web Studio',generator:'template-scaffold',requiresHostCustomization:true},null,2));
await writeFile(path.join(dest,'README.md'),`# ${brand.replace(/[\r\n]/g,' ')}\n\nOriginal template scaffold. Customize its content before production.\n\nRun: npm start\nOpen: http://127.0.0.1:4173\nQA: npm install && npx playwright install chromium && npm run test:browser\nNo API keys, CDN or build step required. Node.js 22+.\n`);
console.log(JSON.stringify({status:'created',path:dest,template:options.template,requiresHostCustomization:true}));
