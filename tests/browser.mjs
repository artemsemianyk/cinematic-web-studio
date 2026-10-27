import {chromium} from 'playwright';
import {spawn} from 'node:child_process';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const out=process.env.CWS_TEST_OUTPUT||'test-results';await mkdir(out,{recursive:true});
let standalone=false;try{await readFile('site.json');standalone=true;}catch{}
const port=Number(process.env.CWS_TEST_PORT||4174);
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:String(port)},stdio:'pipe'});
let logs='';server.stderr.on('data',d=>logs+=d);server.stdout.on('data',d=>logs+=d);
const base=`http://127.0.0.1:${port}`;
const result={time:new Date().toISOString(),browser:null,checks:[],failures:[],scope:'Desktop and mobile Chromium emulation; not physical devices or Safari'};
let browser;
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
try{
 for(let i=0;i<50;i++){try{if((await fetch(base)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true,...(process.env.CWS_CHROMIUM?{executablePath:process.env.CWS_CHROMIUM}:{}),args:['--enable-unsafe-swiftshader']});result.browser=browser.version();
 const paths=standalone?['']:['cinematic-landing','interactive-3d','scroll-animation','coffee-acceptance'];
 for(const name of paths)for(const [device,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]){
  const page=await browser.newPage({viewport,deviceScaleFactor:1,isMobile:device==='mobile',hasTouch:device==='mobile'});const errors=[];const requests=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);requests.push(r.url());});page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));
  const label=`${name||'generated'}-${device}`;
  try{
   await page.goto(standalone?base:base+'/examples/'+name+'/',{waitUntil:'networkidle'});
   await page.locator('h1').waitFor();assert.ok(await page.locator('h1').isVisible());
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'horizontal overflow');
   const three=await page.locator('[data-scene]').count();const story=await page.locator('[data-story]').count();
   if(three){await page.waitForFunction(()=>window.cinematicState?.ready);assert.ok(await page.evaluate(()=>cinematicState.meshes>=4));assert.ok(requests.some(u=>u.endsWith('/cup.glb')));const before=hash(await page.locator('canvas').screenshot());await page.getByRole('button',{name:'Rotate right',exact:true}).click();await page.waitForTimeout(100);assert.notEqual(hash(await page.locator('canvas').screenshot()),before,'rendered pixels must change');assert.ok(await page.evaluate(()=>cinematicState.rotation>0));await page.getByRole('button',{name:'Reset camera',exact:true}).click();await page.waitForTimeout(100);assert.ok(Math.abs(await page.evaluate(()=>cinematicState.rotation))<.01);
    if(device==='desktop'){const canvas=page.locator('canvas');const b=await canvas.boundingBox();const beforeOrbit=hash(await canvas.screenshot());await page.mouse.move(b.x+b.width*.45,b.y+b.height*.5);await page.mouse.down();await page.mouse.move(b.x+b.width*.7,b.y+b.height*.55,{steps:8});await page.mouse.up();await page.waitForTimeout(100);assert.notEqual(hash(await canvas.screenshot()),beforeOrbit,'pointer orbit');await page.getByRole('button',{name:'Reset camera',exact:true}).click();}
   }
   await page.screenshot({path:`${out}/${label}-start.png`});
   if(story){const distance=await page.locator('[data-story]').evaluate(el=>el.offsetHeight-innerHeight);await page.evaluate(y=>scrollTo(0,y),distance*.5);await page.waitForTimeout(400);assert.ok(await page.locator('[data-chapter]').nth(1).evaluate(el=>el.classList.contains('active')));if(three){assert.ok(await page.evaluate(()=>cinematicState.rotation>1));assert.ok(await page.evaluate(()=>cinematicState.cameraZ<4.8));}await page.screenshot({path:`${out}/${label}-middle.png`});await page.evaluate(y=>scrollTo(0,y),distance*.95);await page.waitForTimeout(400);assert.ok(await page.locator('[data-chapter]').nth(2).evaluate(el=>el.classList.contains('active')));await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(400);assert.ok(await page.locator('[data-chapter]').first().evaluate(el=>el.classList.contains('active')));}
   if(await page.locator('[data-choice]').count()){await page.locator('[data-choice]').first().click();assert.equal(await page.locator('[data-choice]').first().getAttribute('aria-pressed'),'true');assert.match(await page.locator('[data-selection]').innerText(),/no order was placed/);}
   for(const a of await page.locator('a[href^="#"]').all()){const href=await a.getAttribute('href');assert.equal(await page.locator(href).count(),1,`anchor ${href}`);}
   assert.deepEqual(errors,[]);assert.ok(requests.every(u=>u.startsWith(base)),'no external media dependency');
   result.checks.push({name:label,status:'passed',three:Boolean(three),story:Boolean(story),requests:requests.length});
  }catch(e){result.failures.push({name:label,error:e.stack,console:errors});await page.screenshot({path:`${out}/${label}-failure.png`});}finally{await page.close();}
 }
 const coffee=standalone?base:base+'/examples/coffee-acceptance/';
 const reducedPage=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await reducedPage.goto(coffee);if(await reducedPage.locator('[data-scene]').count()){await reducedPage.waitForFunction(()=>cinematicState.ready);await reducedPage.evaluate(()=>scrollTo(0,1000));await reducedPage.waitForTimeout(150);assert.equal(await reducedPage.evaluate(()=>cinematicState.rotation),0);assert.equal(await reducedPage.locator('.steam').evaluate(el=>getComputedStyle(el).animationName),'none');}result.checks.push({name:'reduced-motion',status:'passed'});await reducedPage.close();
 const missing=await browser.newPage();await missing.route('**/cup.glb',r=>r.abort());await missing.goto(coffee);if(await missing.locator('[data-scene]').count()){await missing.waitForFunction(()=>Boolean(cinematicState.error));assert.ok(await missing.locator('h1').isVisible());assert.match(await missing.locator('[data-status]').innerText(),/could not be loaded/);}result.checks.push({name:'missing-model-fallback',status:'passed'});await missing.close();
 const noGL=await browser.newPage();await noGL.addInitScript(()=>{const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return String(type).startsWith('webgl')?null:get.call(this,type,...args);};});await noGL.goto(coffee);if(await noGL.locator('[data-scene]').count()){await noGL.waitForFunction(()=>Boolean(cinematicState.error));assert.ok(await noGL.locator('h1').isVisible());}result.checks.push({name:'no-webgl-fallback',status:'passed'});await noGL.close();
}catch(e){result.failures.push({name:'harness',error:e.stack,logs});}
finally{await browser?.close();server.kill();await writeFile(`${out}/report.json`,JSON.stringify(result,null,2));}
console.log(JSON.stringify(result,null,2));if(result.failures.length)process.exitCode=1;
