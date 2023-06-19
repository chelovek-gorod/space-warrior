var app;(()=>{"use strict";var t={d:(e,i)=>{for(var s in i)t.o(i,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{CURSOR:()=>G,addToMaxAsteroids:()=>pt,addToMaxEnemies:()=>ft,asteroidsArr:()=>lt,enemiesArr:()=>ut,enemiesBulletsArr:()=>xt,gameCursor:()=>nt,oneLoopObjectsArr:()=>wt,player:()=>at,rocksArr:()=>mt});const i={},s={},h={};let r=0,n=0;const a=new class{constructor(){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.updateCanvasSizes()}updateCanvasSizes(){this.width=innerWidth,this.height=innerHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.centerX=Math.floor(this.width/2),this.centerY=Math.floor(this.height/2)}},o=class{constructor(t="",e=0,i=0,s){this.x=e,this.y=i,this.size=s.size||24,this.font=s.font||"Arial",this.color=s.color||"#00ff00",this.align=s.align||"left",this.fillTextX=0,this.drawTextX=e,this.img=document.createElement("canvas"),this.ctx=this.img.getContext("2d"),this.img.width=this.getTextWidth(t),this.img.height=this.size,this.render(t)}getTextWidth(t){return this.ctx.font=`${this.size}px ${this.font}, Arial, sans-serif`,this.ctx.measureText(t||" ").width}render(t){if(this.ctx.clearRect(0,0,this.img.width,this.img.height),this.img.width=this.getTextWidth(t),"left"!==this.align)switch(this.align){case"right":this.fillTextX=this.img.width,this.drawTextX=this.x-this.img.width;break;case"center":this.fillTextX=Math.floor(this.img.width/2),this.drawTextX=this.x-Math.floor(this.img.width/2);break;default:this.align="left"}this.ctx.font=`${this.size}px ${this.font}, Arial, sans-serif`,this.ctx.textBaseline="top",this.ctx.textAlign=this.align,this.ctx.fillStyle=this.color,this.ctx.fillText(t||" ",this.fillTextX,0)}draw(){a.context.drawImage(this.img,this.drawTextX,this.y)}},c=new class extends o{constructor(){super("FPS",a.width-2,a.height-12,{size:10,font:"PTSans",align:"right"}),this.updateTimeoutFPS=500,this.currentTimeFPS=0,this.frameCounter=0}update(t){if(this.frameCounter++,this.currentTimeFPS+=t,this.currentTimeFPS>=this.updateTimeoutFPS){const t=`FPS: ${(this.frameCounter/this.currentTimeFPS*1e3).toFixed(2)}`;this.render(t),this.frameCounter=0,this.currentTimeFPS=0}this.draw()}},l=new class extends o{constructor(){super("Performance",2,a.height-12,{size:10,font:"PTSans"}),this.updateTimeoutPerformance=500,this.currentTimePerformance=0,this.performanceTestStartTime=0,this.performanceArr=[]}start(){this.performanceTestStartTime=performance.now()}update(t){if(this.performanceArr.push(performance.now()-this.performanceTestStartTime),this.currentTimePerformance+=t,this.currentTimePerformance>=this.updateTimeoutPerformance){let t=0;for(let e=0;e<this.performanceArr.length;e++)t+=this.performanceArr[e];const e=`Performance: ${(t/this.performanceArr.length).toFixed(3)} ms`;this.render(e),this.performanceArr.length=0,this.currentTimePerformance=0}this.draw()}},d=new Audio;d.addEventListener("ended",g);let p=0,m=[],u="";function g(){d.src=u+m[p],d.play(),p++,p===m.length&&(p=0)}function f(t){s[t].currentTime=0,s[t].play()}let x,w=null,_=!1,T=!1,b=!1,k=!0;function A(t){const e=t-x;x=t,a.context.clearRect(0,0,a.width,a.height),b&&l.start(),w(e),b&&l.update(e),T&&c.update(e),k&&requestAnimationFrame(A)}window.onblur=function(){k=!1,console.log("screen onblur"),_||d.pause()},window.onfocus=function(){k||(k=!0,x=performance.now(),requestAnimationFrame(A),console.log("screen onfocus"),_||d.src&&d.play())};const S=2*Math.PI;function y(t){const e=[];for(let i=0;i<t.length;i++)t[i].isExist&&e.push(t[i]);return e}function v(t,e){t.centerX+=Math.cos(t.direction)*e,t.centerY+=Math.sin(t.direction)*e}function M(t,e){let i=e.centerX-t.centerX,s=e.centerY-t.centerY;return Math.sqrt(i**2+s**2)}Math.PI;const Y={x:0,y:0,isClick:!1,isContext:!1,isWheel:!1,isWheelUp:!1,isWheelDown:!1};document.onmousemove=t=>{Y.x=t.pageX,Y.y=t.pageY},document.oncontextmenu=t=>t.preventDefault(),document.onmousedown=t=>{switch(t.button){case 0:Y.isClick=!0;break;case 1:Y.isWheel=!0;break;case 2:Y.isContext=!0}},document.onmouseup=t=>{switch(t.button){case 0:Y.isClick=!1;break;case 1:Y.isWheel=!1;break;case 2:Y.isContext=!1}},document.onwheel=t=>{t.preventDefault(),t.deltaY>0&&(Y.isWheelDown=!0),t.deltaY<0&&(Y.isWheelUp=!0)};const X=Y,P={x:0,y:0,isClick:!1};document.addEventListener("touchstart",(function(t){const e=t.touches[0];P.x=e.pageX,P.y=e.pageY,P.isClick=!0})),document.addEventListener("touchmove",(function(t){const e=t.touches[0];P.x=e.pageX,P.y=e.pageY})),document.addEventListener("touchend",(function(t){P.isClick=!1}));const E=P,W=class{constructor(t,e,s){this.img=i[t],this.centerX=e,this.centerY=s,this.width=this.img.width,this.height=this.img.height,this.halfWidth=Math.floor(this.width/2),this.halfHeight=Math.floor(this.height/2),this.direction=0}draw(){0===this.direction?a.context.drawImage(this.img,this.centerX-this.halfWidth,this.centerY-this.halfHeight):(a.context.setTransform(1,0,0,1,this.centerX,this.centerY),a.context.rotate(this.direction),a.context.drawImage(this.img,-this.halfWidth,-this.halfHeight),a.context.setTransform(1,0,0,1,0,0))}},H=class extends W{constructor(t,e,i){super("MarsGameLogoDarkBg2k.png",a.centerX,a.centerY),this.delayTime=t,this.showHideTime=e,this.visibleTime=i,this.alphaStepPerMillisecond=1/this.showHideTime,this.visibleState="emerging",this.isExist=!0,this.alpha=0}update(t){if(this.delayTime>0)this.delayTime-=t;else{switch(this.visibleState){case"emerging":this.alpha+=this.alphaStepPerMillisecond*t,this.alpha>=1&&(this.alpha=1,this.visibleState="visible");break;case"visible":this.visibleTime-=t,this.visibleTime<=0&&(this.visibleState="disappearing");break;default:this.alpha-=this.alphaStepPerMillisecond*t,this.alpha<=0&&(this.alpha=0,this.isExist=!1)}this.alpha<1&&(a.context.save(),a.context.globalAlpha=this.alpha),this.draw(),this.alpha<1&&a.context.restore()}}},C=class extends o{constructor(t,e,i,s,h,r,n){super(t,e,i,{size:s,font:"MicraDi",color:"#ffffff",align:"center"}),this.shadowColor="#0000ff",this.delayTime=h,this.showHideTime=r,this.visibleTime=n,this.alphaStepPerMillisecond=1/this.showHideTime,this.visibleState="emerging",this.isExist=!0,this.alpha=0}update(t){if(this.delayTime>0)this.delayTime-=t;else{switch(this.visibleState){case"emerging":this.alpha+=this.alphaStepPerMillisecond*t,this.alpha>=1&&(this.alpha=1,this.visibleState="visible");break;case"visible":this.visibleTime-=t,this.visibleTime<=0&&(this.visibleState="disappearing");break;default:this.alpha-=this.alphaStepPerMillisecond*t,this.alpha<=0&&(this.alpha=0,this.isExist=!1)}this.alpha<1&&(a.context.save(),a.context.globalAlpha=this.alpha),a.context.save(),a.context.shadowBlur=5,a.context.shadowColor=this.shadowColor,a.context.globalCompositeOperation="lighter",this.draw(),a.context.restore(),this.alpha<1&&a.context.restore()}}},D=class{constructor(t,e,s,h,r,n="left",a="top"){this.tile=i[t],this.x=e,this.y=s,this.width=h,this.height=r,this.halfWidth=Math.floor(this.width/2),this.halfHeight=Math.floor(this.height/2),this.img=document.createElement("canvas"),this.img.width=this.width,this.img.height=this.height,this.ctx=this.img.getContext("2d"),this.generateImage(h,r,n,a),this.direction=0}generateImage(t,e,i,s){let h=0,r=0;"center"===i&&(t>this.tile.width&&(h=-Math.floor((this.tile.width-t%this.tile.width)/2)),t<this.tile.width&&(h=-Math.floor((this.tile.width-t)/2))),"right"===i&&(t>this.tile.width&&(h=-(this.tile.width-t%this.tile.width)),t<this.tile.width&&(h=-(this.tile.width-t))),"center"===s&&(e>this.tile.height&&(r=-Math.floor((this.tile.height-e%this.tile.height)/2)),e<this.tile.height&&(r=-Math.floor((this.tile.height-e)/2))),"bottom"===s&&(e>this.tile.height&&(r=-(this.tile.height-e%this.tile.height)),e<this.tile.height&&(r=-(this.tile.height-e)));for(let i=r;i<e;i+=this.tile.height)for(let e=h;e<t;e+=this.tile.width)this.ctx.drawImage(this.tile,e,i)}draw(){0===this.direction?a.context.drawImage(this.img,this.x,this.y):(a.context.setTransform(1,0,0,1,this.x+this.halfWidth,this.y+this.halfHeight),a.context.rotate(this.direction),a.context.drawImage(this.img,-this.halfWidth,-this.halfHeight),a.context.setTransform(1,0,0,1,0,0))}},F=class extends D{constructor(t,e,i){super(t,0,...function(t){const e=(Math.ceil(a.height/t)+1)*t;return[-(e-a.height),a.width,e,"center","bottom"]}(e)),this.restartY=this.y,this.scrollSpeed=i}update(t){this.y+=this.scrollSpeed*t,this.y>0&&(this.y-=this.restartY),this.draw()}},z=class extends W{constructor(t,e,i,s,h,r=0){super(t,e,i),this.offsetY=s,this.scrollSpeed=h,this.rotationSpeed=r}update(t){this.rotationSpeed&&(this.direction+=this.rotationSpeed),this.centerY+=this.scrollSpeed*t,this.centerY-this.halfHeight>a.height&&(this.centerY-=this.offsetY+a.height),this.centerY+this.halfHeight>0&&this.centerY-this.halfHeight<a.height&&this.draw()}},L=class{constructor(t,e,s,h,r,n,a=60){this.img=i[t],this.centerX=e,this.centerY=s,this.width=h,this.height=r,this.halfWidth=Math.floor(this.width/2),this.halfHeight=Math.floor(this.height/2),this.framesArr=this.getFramesArr(h,r,n),this.frame=0,this.frames=n,this.nextFrameTimeout=Math.floor(1e3/a),this.nextFrameTime=this.nextFrameTimeout,this.direction=0}getFramesArr(t,e,i){const s=[];for(let i=0;i<this.img.height;i+=e)for(let e=0;e<this.img.width;e+=t)s.push({x:e,y:i});return s.length=i,s}drawWithAnimation(t){this.nextFrameTime-=t,this.nextFrameTime<0&&(this.nextFrameTime+=this.nextFrameTimeout,this.frame++,this.frame===this.frames&&(this.frame=0)),0===this.direction?this.draw():(a.context.setTransform(1,0,0,1,this.centerX,this.centerY),a.context.rotate(this.direction),this.draw(-this.halfWidth,-this.halfHeight),a.context.setTransform(1,0,0,1,0,0))}draw(t=this.centerX-this.halfWidth,e=this.centerY-this.halfHeight){a.context.drawImage(this.img,this.framesArr[this.frame].x,this.framesArr[this.frame].y,this.width,this.height,t,e,this.width,this.height)}},I=class extends L{constructor(){super("player_cursor_48x48px_16frames.png",0,0,48,48,16,12)}update(t){this.centerX=G.x,this.centerY=G.y,this.drawWithAnimation(t)}},O=class extends W{constructor(t,e,i){super("player_bullet_10x40px.png",t,e),this.speed=i,this.isExist=!0}update(t){this.centerY-=this.speed*t,this.centerY<-this.halfHeight?this.isExist=!1:this.draw()}},$=class extends L{constructor(t,e,i,s,h,r,n=60){super(t,e,i,s,h,r,n),this.direction=Math.random()*Math.PI*2,this.isOnEnd=!1,this.isExist=!0}update(t){this.drawWithAnimation(t),this.frame===this.frames-1&&(this.isExist=!1)}},R=class extends W{constructor(t,e,i,s,h,r){super("player_rocket_30x12px.png",t,e),this.direction=-Math.PI/2,this.speed=i,this.acceleration=s,this.turnSpeed=h,this.power=r,this.size=12,this.addSmokeTimeout=60,this.addSmokeTime=this.addSmokeTimeout,this.isExist=!0}update(t){let e=null,i=1/0;for(let t=0;t<lt.length;t++){let s=M(this,lt[t]);s<i&&(e=lt[t],i=s)}if(!e){this.isExist=!1,at.rockets++;let t=new $("explosion_64x64px_17frames.png",this.centerX,this.centerY,64,64,17,30);return wt.push(t),void f("se_small_explosion.mp3")}if(function(t,e,i){let s=Math.atan2(e.centerY-t.centerY,e.centerX-t.centerX),h=s-t.direction%S;if(h){if(h<-Math.PI&&(h+=S),h>Math.PI&&(h-=S),Math.abs(h)<=i)return t.direction=s,void console.log("deflection 0");t.direction+=h<0?-i:i}}(this,e,this.turnSpeed),v(this,this.speed*t),this.centerY<-this.halfHeight||this.centerY+this.halfHeight>a.height||this.centerX<-this.halfHeight||this.centerX+this.halfHeight>a.width)return at.rockets++,void(this.isExist=!1);if(this.addSmokeTime-=t,this.addSmokeTime<0){this.addSmokeTime=this.addSmokeTimeout;let t=new $("smoke_32x32px_25frames.png",this.centerX,this.centerY,32,32,25,12);t.direction=Math.random()*(2*Math.PI),wt.push(t)}this.draw(),this.addSmokeTimeout/=this.acceleration,this.speed*=this.acceleration}},K={up:!1,down:!1,left:!1,right:!1,space:!1,q:!1};document.addEventListener("keydown",(t=>{switch(t.code){case"KeyA":case"ArrowLeft":K.left=!0;break;case"KeyD":case"ArrowRight":K.right=!0;break;case"KeyW":case"ArrowUp":K.up=!0;break;case"KeyS":case"ArrowDown":K.down=!0;break;case"Space":K.space=!0}})),document.addEventListener("keyup",(t=>{switch(t.code){case"KeyA":case"ArrowLeft":K.left=!1;break;case"KeyD":case"ArrowRight":K.right=!1;break;case"KeyW":case"ArrowUp":K.up=!1;break;case"KeyS":case"ArrowDown":K.down=!1;break;case"Space":K.space=!1}console.log("key code :",t.code)}));const B=K,j=class extends L{constructor(){super("player_74x100px_16frames.png",a.centerX,a.height+50,74,100,16,30),this.hp=100,this.scores=0,this.speed=1.2,this.hpText=new o("HP: 100%",6,6,{size:20,font:"MicraDi",color:"#ffffff",align:"left"}),this.scoresText=new o("Scores: 0",a.width-6,6,{size:20,font:"MicraDi",color:"#ffffff",align:"right"}),this.size=32,this.shutTimeout=1200,this.shutTime=this.shutTimeout,this.bulletSpeed=1.8,this.bulletsArr=[],this.rockets=1,this.rocketLaunchTimeout=1e3,this.rocketLaunchTime=this.rocketLaunchTimeout,this.rocketStartSpeed=.1,this.rocketAcceleration=1.02,this.rocketTurnSpeed=.05,this.rocketPower=5,this.rocketsArr=[]}addScores(t){this.scores+=t,this.scoresText.render(`Scores: ${this.scores}`)}addDamage(t){if(this.hp-=t,this.hp<1){this.bulletsArr=[],this.rocketsArr=[],this.centerY=2*a.height,this.hp=0,this.hpText.render("HP: 0%");let t=new $("explosion_200x200px_18frames.png",this.centerX,this.centerY,200,200,18,30);return wt.push(t),void f("se_explosion.mp3")}this.hpText.render(`HP: ${this.hp}%`)}update(t){if(this.shutTime-=t,this.shutTime<=0){this.shutTime+=this.shutTimeout;const t=new O(this.centerX,this.centerY,this.bulletSpeed);this.bulletsArr.push(t),f("se_laser_shut.mp3")}for(let e=0;e<this.bulletsArr.length;e++)this.bulletsArr[e].update(t);if(this.bulletsArr=y(this.bulletsArr),this.rocketLaunchTime>0)this.rocketLaunchTime-=t;else if(this.rockets>0&&(G.isClick||B.space)){this.rockets--,this.rocketLaunchTime+=this.rocketLaunchTimeout;const t=new R(this.centerX,this.centerY,this.rocketStartSpeed,this.rocketAcceleration,this.rocketTurnSpeed,this.rocketPower);this.rocketsArr.push(t),f("se_rocket_launch.mp3")}for(let e=0;e<this.rocketsArr.length;e++)this.rocketsArr[e].update(t);this.rocketsArr=y(this.rocketsArr),function(t,e,i){if(t.centerX!==e.centerX||t.centerY!==e.centerY){let s=M(t,e);if(s<=i)t.centerX=e.centerX,t.centerY=e.centerY;else{let h=i/s;t.centerX+=h*(e.centerX-t.centerX),t.centerY+=h*(e.centerY-t.centerY)}}}(this,nt,this.speed),this.drawWithAnimation(t)}},q=class extends L{constructor(t,e,i,s){super("rock_white_50x50px_8frames.png",t,e,50,50,8,18),this.speed=i,this.direction=s,this.damage=10,this.scores=5,this.size=24,this.isExist=!0}getDamage(){this.isExist=!1;let t=new $("explosion_64x64px_17frames.png",this.centerX,this.centerY,64,64,17,30);wt.push(t),f("se_small_explosion.mp3")}update(t){v(this,this.speed*t);for(let t=0;t<at.bulletsArr.length;t++)if(M(this,at.bulletsArr[t])<this.size)return at.bulletsArr[t].isExist=!1,this.getDamage(),void at.addScores(2);for(let t=0;t<at.rocketsArr.length;t++)if(M(this,at.rocketsArr[t])<this.size)return at.rockets++,at.rocketsArr[t].isExist=!1,this.getDamage(),void at.addScores(1);if(M(this,at)<this.size+at.size)return at.addDamage(this.damage),void this.getDamage();this.centerY-this.halfHeight>a.height||this.centerY+this.halfHeight<0||this.centerX-this.halfWidth>a.width||this.centerX+this.halfWidth<0?this.isExist=!1:this.drawWithAnimation(t)}},U=class extends L{constructor(t,e,i){super("asteroid_white_90x108px_29frames.png",t,e,90,108,29,30),this.speed=i,this.direction=Math.random()*(2*Math.PI),this.sideSpeed=(Math.random()<.5?-i:i)*Math.random()/2,this.hp=1+Math.ceil(2*Math.random()),this.damage=10*this.hp,this.scores=5*this.hp,this.size=36,this.isExist=!0}getDamage(t,e){if(this.hp-=t,this.hp>0){let t=new $("explosion_64x64px_17frames.png",e.centerX,e.centerY,64,64,17,30);wt.push(t),f("se_small_explosion.mp3")}else{this.isExist=!1,pt();let t=new $("explosion_200x200px_18frames.png",this.centerX,this.centerY,200,200,18,30);wt.push(t),f("se_explosion.mp3"),e!==at&&this.generateRocks()}}generateRocks(){let t=2+Math.ceil(3*Math.random()),e=2*Math.PI/t;for(let i=0;i<t;i++){let t=e*i+Math.random()*e;mt.push(new q(this.centerX,this.centerY,2*this.speed,t))}}update(t){this.centerY+=this.speed*t,this.centerX+=this.sideSpeed*t;for(let t=0;t<at.bulletsArr.length;t++)if(M(this,at.bulletsArr[t])<this.size){if(at.bulletsArr[t].isExist=!1,this.getDamage(1,at.bulletsArr[t]),!(this.hp>0))return void at.addScores(this.scores);at.addScores(1)}for(let t=0;t<at.rocketsArr.length;t++)if(M(this,at.rocketsArr[t])<this.size&&(at.rockets++,at.rocketsArr[t].isExist=!1,this.getDamage(at.rocketsArr[t].damage,at.rocketsArr[t]),this.hp<=0))return void at.addScores(Math.floor(this.scores/2));if(M(this,at)<this.size+at.size)return at.addDamage(this.damage),void this.getDamage(this.hp,at);this.centerY-this.halfHeight>a.height||this.centerX-this.halfWidth>a.width||this.centerX+this.halfWidth<0?this.isExist=!1:this.drawWithAnimation(t)}},G=navigator.userAgent.indexOf("Android")>0||navigator.userAgent.indexOf("iPhone")>0||navigator.userAgent.indexOf("iPad")>0||navigator.userAgent.indexOf("(X11;")>0?E:X;let V,J,N,Q,Z;!function(t,e){r=t.images.arr.length+t.sounds.arr.length;const o=document.createElement("div");function c(){n++,o.innerHTML=`Loaded files: ${n}/${r}`,n===r&&function(){r=0,n=0,o.remove();const t=document.createElement("button");t.id="startButton",t.innerHTML="START",t.onclick=function(){t.remove(),function(){a.canvas.style.cursor="none",tt=new F("scrolling_bg_2000x3400px.png",3400,.01);const t=Math.floor(a.width/3);et=new z("galaxy_480x420px.png",t,-420,4*a.height,.015,-2e-4),it=new z("galaxy_480x420px.png",2*t,2*-a.height,4*a.height,.015,-2e-4),st=new z("black_hole_left_320x320px.png",160,-a.height,48*a.height,.05),ht=new z("black_hole_right_320x320px.png",a.width-160,24*-a.height,48*a.height,.05),rt=new z("planets_920x760px.png",a.centerX,10*-a.height,60*a.height,.06,5e-4),V=new H(100,1400,1400),J=new C("Space Warrior",a.centerX,a.centerY-80,120,5500,1500,2500),N=new C("Scrolling shooter",a.centerX,a.centerY+50,60,8e3,1500,0),Q=new C("Click screen for start game",a.centerX,a.centerY,40,10700,300,1/0),nt=new I,at=new j,function(t,e,i=0){d.pause(),p=i<e.length?i:0,u=t,m=e,g()}(h.path,h.arr,1),function(t,e=null){t&&(null===w&&document.body.prepend(a.canvas),w=t,e.isFPSdisplay&&(T=!0),e.isPerformanceDisplay&&(b=!0),e.isMusicPlayInOnblur&&(_=!0),x=performance.now(),requestAnimationFrame(A))}(_t,{isFPSdisplay:!0,isPerformanceDisplay:!0,isMusicPlayInOnblur:!1}),Z=new C("GAME OVER",a.centerX,a.centerY,80,0,1e3,1/0)}()},document.body.append(t)}()}o.id="loadingStatusDiv",o.innerHTML=`Loaded files: ${n}/${r}`,document.body.append(o),t.images.arr.forEach((e=>function(e){i[e]=new Image,i[e].src=t.images.path+e,i[e].onload=()=>c()}(e))),t.sounds.arr.forEach((e=>function(e){s[e]=new Audio,s[e].src=t.sounds.path+e,s[e].oncanplaythrough=t=>{t.target.oncanplaythrough=null,c()}}(e))),h.path=t.music.path,h.arr=t.music.arr}({images:{path:"./src/images/",arr:["MarsGameLogoDarkBg2k.png","scrolling_bg_2000x3400px.png","black_hole_left_320x320px.png","black_hole_right_320x320px.png","galaxy_480x420px.png","planets_920x760px.png","player_74x100px_16frames.png","player_bullet_10x40px.png","player_rocket_30x12px.png","player_cursor_48x48px_16frames.png","explosion_200x200px_18frames.png","explosion_64x64px_17frames.png","smoke_32x32px_25frames.png","asteroid_white_90x108px_29frames.png","rock_white_50x50px_8frames.png","enemy_100x130px.png","enemy_bullet_10x40px.png","bonus_empty_48x48px.png","bonus_bullets_48x48px.png","bonus_repair_48x48px.png","bonus_rockets_48x48px.png","bonus_scores_48x48px.png","bonus_speed_48x48px.png"]},sounds:{path:"./src/sounds/",arr:["se_explosion.mp3","se_small_explosion.mp3","se_laser_shut.mp3","se_rocket_launch.mp3","se_bonus.mp3"]},music:{path:"./src/music/",arr:["bgm_space_1.mp3","bgm_space_2.mp3","bgm_space_3.mp3"]}});let tt,et,it,st,ht,rt,nt,at,ot=!1,ct=11e3,lt=[],dt=3;function pt(){dt+=.2}let mt=[],ut=[],gt=2;function ft(t){gt+=.1}let xt=[],wt=[];function _t(t){if(tt.update(t),!ot)return ct>0?(ct-=t,!0===V.isExist&&V.update(t),!0===J.isExist&&J.update(t),!0===N.isExist&&N.update(t),void Q.update(t)):(Q.update(t),void(G.isClick&&(Q.visibleTime=0,setTimeout((()=>{V.isExist=!1,J.isExist=!1,N.isExist=!1,Q.isExist=!1,ot=!0}),500))));et.update(t),it.update(t),st.update(t),ht.update(t),rt.update(t),nt.update(t);for(let e=0;e<mt.length;e++)mt[e].update(t);mt=y(mt);for(let e=0;e<xt.length;e++)xt[e].update(t);xt=y(xt),ut.length;for(let e=0;e<ut.length;e++)ut[e].update(t);ut=y(ut),lt.length<dt&&function(){let t=Math.random()*a.width,e=-Math.random()*a.centerX,i=+((3+5*Math.random())/50).toFixed(2);lt.push(new U(t,e,i))}();for(let e=0;e<lt.length;e++)lt[e].update(t);lt=y(lt),at.hp>0?at.update(t):Z.update(t);for(let e=0;e<wt.length;e++)wt[e].update(t);wt=y(wt),at.scoresText.draw(),at.hpText.draw()}app=e})();