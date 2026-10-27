import * as THREE from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {writeFile,mkdir} from 'node:fs/promises';
globalThis.FileReader=class {
  readAsArrayBuffer(blob){blob.arrayBuffer().then(result=>{this.result=result;this.onloadend?.();});}
  readAsDataURL(blob){blob.arrayBuffer().then(result=>{this.result=`data:${blob.type};base64,${Buffer.from(result).toString('base64')}`;this.onloadend?.();});}
};
const cup=new THREE.Group();cup.name='Original ceramic coffee cup';
const ceramic=new THREE.MeshStandardMaterial({color:0xe8c7a4,roughness:.24,metalness:.08});
const profile=[[0,0],[.56,0],[.64,.05],[.68,.12],[.76,.8],[.82,1.13],[.81,1.19],[.76,1.2],[.73,1.15],[.67,.8],[.59,.17],[0,.17]].map(([x,y])=>new THREE.Vector2(x,y));
const body=new THREE.Mesh(new THREE.LatheGeometry(profile,80),ceramic);body.name='Ceramic';cup.add(body);
const handle=new THREE.Mesh(new THREE.TorusGeometry(.4,.105,16,56),ceramic);handle.position.set(.91,.67,0);handle.scale.set(.9,1.1,1);handle.name='Handle';cup.add(handle);
const coffee=new THREE.Mesh(new THREE.CylinderGeometry(.723,.723,.015,80),new THREE.MeshStandardMaterial({color:0x3b1609,roughness:.16,metalness:.05}));coffee.position.y=1.075;coffee.name='Coffee';cup.add(coffee);
const saucer=new THREE.Mesh(new THREE.CylinderGeometry(1.15,1.07,.07,80),ceramic);saucer.position.y=-.06;saucer.name='Saucer';cup.add(saucer);
cup.position.y=-.55;
const scene=new THREE.Scene();scene.add(cup);
const result=await new GLTFExporter().parseAsync(scene,{binary:true});
await mkdir('examples/shared',{recursive:true});await writeFile('examples/shared/cup.glb',Buffer.from(result));
console.log(`Original GLB: ${result.byteLength} bytes`);
