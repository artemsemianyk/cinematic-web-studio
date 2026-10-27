import {build} from 'esbuild';
import {copyFile,mkdir} from 'node:fs/promises';
await mkdir('examples/shared',{recursive:true});
await build({entryPoints:['src/scene.js'],outfile:'examples/shared/scene.js',bundle:true,minify:true,format:'esm',target:'es2022',legalComments:'eof'});
await copyFile('node_modules/three/LICENSE','examples/shared/THREE-LICENSE.txt');
console.log('Built local Three.js scene bundle.');
