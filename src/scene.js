import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
const host=document.querySelector('[data-scene]');
const status=document.querySelector('[data-status]');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let renderer,model,controls,frame=0,visible=true,progress=0,rotation=0;
const state={ready:false,progress:0,rotation:0,cameraZ:5,meshes:0,error:null};
window.cinematicState=state;
function fallback(message){state.error=message;host.dataset.fallback='true';status.textContent=message+' The written story remains available.';}
try{
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<600?1.5:2));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.5;
  host.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-label','Interactive ceramic coffee cup');
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(34,1,.1,30);camera.position.set(0,1.65,5);
  controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=false;controls.enablePan=false;controls.enableZoom=false;controls.minPolarAngle=.45;controls.maxPolarAngle=1.8;controls.target.set(0,.1,0);controls.update();
  scene.add(new THREE.HemisphereLight(0xffe6c9,0x29223a,2.3));
  const key=new THREE.DirectionalLight(0xffd3a4,4);key.position.set(-3,5,4);scene.add(key);
  const rim=new THREE.DirectionalLight(0xe7edff,3);rim.position.set(3,2,-3);scene.add(rim);
  const fill=new THREE.DirectionalLight(0xffffff,1);fill.position.set(1,1,4);scene.add(fill);
  function render(){frame=0;if(!visible||document.hidden)return;renderer.render(scene,camera);state.cameraZ=camera.position.z;}
  function request(){if(!frame)frame=requestAnimationFrame(render);}
  function resize(){const {width,height}=host.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();request();}
  const observer=new ResizeObserver(resize);observer.observe(host);
  const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)request();});visibility.observe(host);
  function update(){const story=document.querySelector('[data-story]');if(!story)return;const rect=story.getBoundingClientRect();progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-innerHeight)));state.progress=progress;host.style.setProperty('--progress',progress);document.querySelectorAll('[data-chapter]').forEach((el,i)=>{el.classList.toggle('active',i===Math.min(2,Math.floor(progress*3)));});if(model){model.rotation.y=reduced.matches?rotation:rotation+progress*Math.PI*1.5;state.rotation=model.rotation.y;if(!reduced.matches){camera.position.set(0,1.65-progress*.3,5-progress*1.1);controls.update();}request();}}
  new GLTFLoader().load(new URL('../shared/cup.glb',import.meta.url).href,gltf=>{model=gltf.scene;scene.add(model);model.traverse(o=>{if(o.isMesh)state.meshes++;});state.ready=true;host.dataset.ready='true';status.textContent='Drag to explore · use rotation buttons';update();request();},undefined,()=>fallback('The 3D model could not be loaded.'));
  controls.addEventListener('change',request);
  document.querySelectorAll('[data-rotate]').forEach(button=>button.addEventListener('click',()=>{rotation+=Number(button.dataset.rotate)*Math.PI/6;if(model){model.rotation.y=rotation+(reduced.matches?0:progress*Math.PI*1.5);state.rotation=model.rotation.y;request();}}));
  document.querySelector('[data-reset]')?.addEventListener('click',()=>{rotation=0;controls.reset();update();if(model){model.rotation.y=reduced.matches?0:progress*Math.PI*1.5;state.rotation=model.rotation.y;}request();});
  window.addEventListener('scroll',update,{passive:true});reduced.addEventListener('change',update);document.addEventListener('visibilitychange',request);
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();fallback('3D rendering paused. Reload to restore it.');});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();controls.dispose();scene.traverse(o=>{o.geometry?.dispose();if(o.material)for(const mat of [].concat(o.material))mat.dispose();});renderer.dispose();},{once:true});
}catch{fallback('This device cannot display WebGL 3D.');}
