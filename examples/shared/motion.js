const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const story=document.querySelector('[data-story]');
let scheduled=false;
function update(){scheduled=false;if(!story)return;const rect=story.getBoundingClientRect();const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-innerHeight)));document.documentElement.style.setProperty('--p',reduced.matches?0:progress);document.querySelectorAll('[data-chapter]').forEach((node,i)=>node.classList.toggle('active',i===Math.min(2,Math.floor(progress*3))));window.scrollState={progress,chapter:Math.min(2,Math.floor(progress*3))};}
addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){if(!reduced.matches)entry.target.animate([{opacity:.4,transform:'translateY(25px)'},{opacity:1,transform:'none'}],{duration:650,easing:'ease-out'});observer.unobserve(entry.target);}}},{threshold:.1});
document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('[data-selection]').textContent=`Your tasting choice: ${button.dataset.choice}. This is a concept demo; no order was placed.`;}));
