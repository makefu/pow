// <body style="display:none" onload="window.location.href='http://usepow.com/about'+window.location.hash">
// POW: a simple javascript presentation tool.
// source code: http://github.com/chromakode/pow
(function(b) { if (!window.pow) eval(b.init); pow.bundle(b); })({
 "data": "pow.module(\"compat\",function(){pow.compat={};pow.compat.good=!0;pow.compat.check=function(){if(!document.head)document.head=document.getElementsByTagName(\"head\")[0],pow.compat.good=!1;if(!Function.prototype.bind)Function.prototype.bind=function(a){var c=[].slice,d=c.call(arguments,1),e=this,f=function(){},g=function(){return e.apply(this instanceof f?this:a||{},d.concat(c.call(arguments)))};f.prototype=e.prototype;g.prototype=new f;return g},pow.compat.good=!1;var a=document.createElement(\"div\");\na.innerHTML=\"<svg/>\";pow.compat.inlineSVG=\"http://www.w3.org/2000/svg\"==(a.firstChild&&a.firstChild.namespaceURI);if(!pow.compat.inlineSVG)pow.compat.good=!1};pow.compat.check();pow.compat.advise=function(){if(!pow.compat.good){if(window.localStorage){if(window.localStorage.compatWarned)return;window.localStorage.compatWarned=!0}var a=new pow.ui.Dialog;a.el.style.borderColor=\"#cc0\";a.el.innerHTML='<h1><strong style=\"color:yellow\">Warning:</strong> These slides require HTML5 features your browser does not support.</h1>\\n<h2 style=\"font-weight:normal\">Some things may not work properly in your current browser. For best goods, try the latest version of <a href=\"http://www.google.com/chrome\">Chrome</a> or <a href=\"http://firefox.com\">Firefox 4</a>.</h2>\\n<p><button>Ok, view the slides.</button></p>';\na.el.getElementsByTagName(\"button\")[0].onclick=function(){a.close()};a.show()}}});pow.module(\"core\",function(){pow.signal=function(){function a(a){b.push(a);return a}var b=[];a.fire=function(){for(var a=0;a<b.length;a++)b[a].apply(null,arguments)};a.remove=function(a){b.splice(b.indexOf(a),1)};a.once=function(b){a(function(){b.apply(null,arguments);a.remove(b)})};a.handlers=b;return a};pow.on={};pow.on.load=new pow.signal;pow.on.start=new pow.signal;pow.params={};pow.params.data={};pow.params.slide=0;pow.params.get=function(a){return\"slide\"==a?this.slide:this.data[a]};pow.params.set=\nfunction(a,b){\"slide\"==a?this.slide=b:this.data[a]=b;this.save()};pow.params.save=function(){params=[];for(var a in this.data)params.push(a+\"=\"+this.data[a]);0!=this.slide&&params.push(this.slide);window.location.hash=params.join(\",\")};pow.params.load=pow.on.load(function(){window.location.hash.substr(1).split(\",\").forEach(function(a){a=a.split(\"=\");1==a.length?pow.params.slide=a[0]:pow.params.data[a[0]]=a[1]})});window.addEventListener(\"DOMContentLoaded\",function(){pow.compat.advise();pow.on.load.fire();\npow.on.start.fire()},!1)});pow.module(\"ui\",function(){pow.style={};pow.style.get=function(a){var b=document.getElementById(a);if(!b)b=document.createElement(\"style\"),b.id=a,document.head.insertBefore(b,document.getElementsByTagName(\"style\")[0]);return b};pow.style.shadow=function(a){return[\"\",\"-webkit-\",\"-moz-\"].map(function(b){return b+\"box-shadow: \"+a}).join(\"; \")};pow.style.disableSelection=function(){return[\"\",\"-webkit-\",\"-moz-\"].map(function(a){return a+\"user-select:none\"}).join(\"; \")+\"; cursor:default\"};pow.el={};pow.el.replace=\nfunction(a,b){var c=document.getElementById(a);c?c.innerHTML=\"\":(c=document.createElement(\"div\"),c.id=a,(b||document.body).appendChild(c));return c};pow.el.addClass=function(a,b){a.classList?a.classList.add(b):~a.className.split(\" \").indexOf(b)||(a.className+=\" \"+b)};pow.el.removeClass=function(a,b){if(a.classList)a.classList.remove(b);else{var c=a.className.split(\" \"),d=c.indexOf(b);~d&&c.splice(d,1);a.className=c.join(\" \")}};pow.Animation=function(a,b){this.on={};this.on.frame=new pow.signal;this.on.finish=\nnew pow.signal;b.frame&&this.on.frame(b.frame);b.finish&&this.on.finish(b.finish);this.duration=a;this.elapsed=0;this.step=1E3/60};pow.Animation.prototype={get finished(){return this.duration&&(!this.reversed?this.elapsed==this.duration:0==this.elapsed)},frame:function(){this.elapsed+=this.step*(!this.reversed?1:-1);this.elapsed=Math.min(Math.max(0,this.elapsed),this.duration);this.on.frame.fire(this.elapsed/this.duration);this.finished&&this.stop()},start:function(){if(!this.interval&&!this.finished)this.on.frame.fire(this.elapsed),\nthis.interval=setInterval(this.frame.bind(this),this.step)},stop:function(){if(this.interval)clearInterval(this.interval),this.interval=null,this.on.finish.fire()},play:function(a){if(a)this.elapsed=0;this.reversed=!1;this.start()},reverse:function(a){if(a)this.elapsed=this.duration;this.reversed=!0;this.start()}};pow.ui={};pow.ui.mask={};pow.ui.mask.show=function(){if(!this.el)this.el=document.createElement(\"div\"),this.el.id=\"pow-mask\",this.bg=document.createElement(\"div\"),this.bg.id=\"pow-mask-bg\",\nthis.el.appendChild(this.bg),document.body.appendChild(this.el)};pow.ui.mask.hide=function(a){if(this.el){var b=this;(new pow.Animation(100,{frame:function(a){b.el.style.opacity=a},finish:function(){a();b.el.parentNode.removeChild(b.el);b.el=null}})).reverse(!0)}};pow.ui.mask.style=\"#pow-mask, .pow-dialog { cursor:default; }\\n#pow-mask, #pow-mask-bg { position:absolute; top:0; left:0; bottom:0; right:0; z-index:998; }\\n#pow-mask-bg { background:black; opacity:.5; }\\n.pow-dialog { position:absolute; top:50%; height:22em; margin-top:-11.75em; left:50%; width:36em; margin-left:-18.75em; background:#111; border:.75em solid #ccc; font-family:sans-serif; color:white; z-index:999; }\\n.pow-dialog h1, h2 { margin:1em; }\\n.pow-dialog h1 { font-size:1.7em; }\\n.pow-dialog h2 { font-size:1.5em; color:#aaa; }\\n.pow-dialog a { color:white; }\\n.pow-dialog p { text-align:center; margin-top:3em; }\\n.pow-dialog button { font-size:20px; }\";\npow.ui.mask.load=pow.on.load(function(){pow.style.get(\"pow-mask-style\").innerHTML=pow.ui.mask.style});pow.ui.Dialog=function(){this.el=document.createElement(\"div\");this.el.className=\"pow-dialog\"};pow.ui.Dialog.prototype={show:function(){if(!this.isShowing)this.isShowing=!0,pow.ui.mask.show(),pow.ui.mask.el.appendChild(this.el)},close:function(){if(this.isShowing){var a=this;pow.ui.mask.hide(function(){this.isShowing=!1;a.el.parentNode.removeChild(a.el)})}}}});pow.module(\"slides\",function(){pow.Animation=function(a,b){this.on={};this.on.frame=new pow.signal;this.on.finish=new pow.signal;b.frame&&this.on.frame(b.frame);b.finish&&this.on.finish(b.finish);this.duration=a;this.elapsed=0;this.step=1E3/60};pow.Animation.prototype={get finished(){return this.duration&&(!this.reversed?this.elapsed==this.duration:0==this.elapsed)},frame:function(){this.elapsed+=this.step*(!this.reversed?1:-1);this.elapsed=Math.min(Math.max(0,this.elapsed),this.duration);this.on.frame.fire(this.elapsed/\nthis.duration);this.finished&&this.stop()},start:function(){if(!this.interval&&!this.finished)this.on.frame.fire(this.elapsed),this.interval=setInterval(this.frame.bind(this),this.step)},stop:function(){if(this.interval)clearInterval(this.interval),this.interval=null,this.on.finish.fire()},play:function(a){if(a)this.elapsed=0;this.reversed=!1;this.start()},reverse:function(a){if(a)this.elapsed=this.duration;this.reversed=!0;this.start()}};pow.slide={};pow.slide.hide=function(){};pow.slide.on={};pow.slide.on.load=\nfunction(){};pow.slide.on.show=function(){};pow.slide.on.hide=function(){};pow.Slide=function(a,b){this.index=a;this.el=b;pow.el.removeClass(this.el,\"current\");this._setup()};pow.Slide.prototype={_setup:function(){this.on={};this.on.load=new pow.signal;this.on.show=new pow.signal;this.on.hide=new pow.signal;var a=pow.slide;pow.slide=this;var b=this.el.getElementsByTagName(\"script\");Array.prototype.forEach.call(b,function(a){/^\\s*pow\\.slide\\.on\\.\\w*\\([\\s\\S]*\\)\\s*$/.test(a.innerHTML)&&eval(a.innerHTML)});\nthis.on.load.fire(this);pow.slide=a},show:function(){if(pow.slide!=this)pow.slide.hide(),pow.slide=this,pow.el.addClass(this.el,\"current\"),pow.slides.on.show.fire(this),this.on.show.fire(this)},hide:function(){pow.el.removeClass(this.el,\"current\");this.on.hide.fire(this);pow.slides.on.hide.fire(this)},get next(){return this.index<pow.slides.length-1&&pow.slides[this.index+1]},get prev(){return 0<this.index&&pow.slides[this.index-1]},animate:function(a,b){var c=new pow.Animation(a,b);this.on.hide.once(c.stop.bind(c));\nreturn c}};pow.slides=[];pow.slides.on={};pow.slides.on.show=new pow.signal;pow.slides.on.hide=new pow.signal;pow.slides.load=pow.on.load(function(){pow.slides.el=document.getElementById(\"slides\");window.addEventListener(\"click\",function(a){(a.target==document.documentElement||a.target==pow.slides.el||a.target.parentNode==pow.slides.el)&&pow.slides.go.next()},!1);var a=document.getElementsByClassName(\"slide\");Array.prototype.forEach.call(a,function(a,c){pow.slides.push(new pow.Slide(c,a))})});pow.slides.go=\nfunction(a){a=Number(a)||0;0>a&&(a+=pow.slides.length);(pow.slides[a]||pow.slides[0]).show()};pow.slides.go.first=function(){pow.slides.go(0)};pow.slides.go.last=function(){pow.slides.go(-1)};pow.slides.go.prev=function(){pow.slide.prev&&pow.slide.prev.show()};pow.slides.go.next=function(){pow.slide.next&&pow.slide.next.show()};pow.slides.style={};pow.slides.style.base=\"html { cursor:none; }\\nbody { margin:0; background:#111; }\\n#slides { position:absolute; display:block; overflow:hidden; cursor:default; }\\n.slide { background:#fff; border-radius:5px; }\\n.slide { display:none; }\\n.slide.current { display:table-cell; vertical-align:middle; }\\n.slide h1, .slide h2 { text-align:center; margin:0; }\\n.slide h1 { font-size:100em; }\\n.slide h2 { font-size:48em; font-weight:normal; }\\n.slide p, .slide > ul > li, .slide > ol > li { font-size:36em; }\";\npow.slides.style.scale=function(){this.el=this.el||pow.style.get(\"pow-slide-scale-style\");var a=Math.min(window.innerWidth,4/3*window.innerHeight)-10,b=0.75*a-10,c=(window.innerWidth-a)/2,d=(window.innerHeight-b)/2,e=a/800;this.el.innerHTML=\"#slides, .slide { height:\"+b.toFixed()+\"px; width:\"+a.toFixed()+\"px;}\\n#slides { left:\"+c+\"px; top:\"+d+\"px; font-size:\"+e.toFixed(4)+\"px; }\\n\"};pow.slides.style.load=pow.on.load(function(){pow.style.get(\"pow-slide-base-style\").innerHTML=pow.slides.style.base;\npow.slides.style.scale();window.addEventListener(\"resize\",function(){pow.slides.style.scale()},!1)});pow.url={};pow.url.update=pow.slides.on.show(function(){pow.params.set(\"slide\",pow.slide.index)});pow.url.read=pow.on.start(function(){pow.slides.go(pow.params.get(\"slide\"))});window.addEventListener(\"hashchange\",pow.url.read,!1);window.addEventListener(\"mouseover\",function(){window.focus()},!1)});pow.module(\"nav\",function(){var a={first:'<path fill=\"white\" d=\"M 15,30 15,55 10,55 10,5 15,5 15,30, 45,0, 45,60 z\"></path>',prev:'<path fill=\"white\" d=\"M 15,30, 45,0, 45,60 z\"></path>',next:'<path fill=\"white\" d=\"M 45,30, 15,0, 15,60 z\"></path>',last:'<path fill=\"white\" d=\"M 45,30 45,55 50,55 50,5 45,5 45,30, 15,0, 15,60 z\"></path>'};navStyle=[\"#pow-nav { position:absolute; width:200px; height:70px; left:50%; line-height:0; margin-left:-100px; padding-top:20px; bottom:15px; opacity:0; \"+pow.style.disableSelection()+\n\"; }\",\"#pow-nav .nav { display:inline-block; width:48px; height:50px; }\",\"#pow-nav .nav, #pow-nav .status { margin:1px; background:rgba(0,0,0,.85); \"+pow.style.shadow(\"0 3px 3px rgba(0,0,0,.5)\")+\"; }\",\"#pow-nav .nav:hover { background:rgba(0,0,0,.90); }\\n#pow-nav .nav:active { background:rgba(0,0,0,1); }\\n#pow-nav .nav .icon { display:block; margin:20%; width:60%; height:60%; }\\n#pow-nav .nav.first { border-top-left-radius:10px; }\\n#pow-nav .nav.last { border-top-right-radius:10px; }\\n#pow-nav .status { height:20px; line-height:20px; text-align:center; color:#aaa; font-family:sans-serif; border-radius:0 0 10px 10px; }\"].join(\"\\n\");\npow.nav={};pow.nav.update=pow.slides.on.show(function(){pow.nav.statusEl.textContent=pow.slide.index+1+\" / \"+pow.slides.length});pow.nav.load=pow.on.load(function(){pow.style.get(\"pow-nav-style\").innerHTML=navStyle;var b=pow.nav.el=pow.el.replace(\"pow-nav\");[\"first\",\"prev\",\"next\",\"last\"].forEach(function(c){var d=document.createElement(\"div\");d.className=\"nav \"+c;d.innerHTML='<svg class=\"icon\" viewBox=\"0 0 60 60\">'+a[c]+\"</svg>\";d.addEventListener(\"click\",function(a){pow.slides.go[c]();a.stopPropagation()},\n!1);b.appendChild(d)});var c=pow.nav.statusEl=document.createElement(\"div\");c.className=\"status\";b.appendChild(c);var d=new pow.Animation(250,{frame:function(a){b.style.opacity=a}});document.addEventListener(\"mousemove\",function(a){a.pageY>b.offsetTop?d.play():d.reverse()},!0);document.addEventListener(\"mouseout\",function(a){a.relatedTarget||d.reverse()},!1);document.addEventListener(\"keydown\",function(a){if(a={13:\"next\",32:\"next\",37:\"prev\",38:\"first\",39:\"next\",40:\"last\"}[a.keyCode])pow.slides.go[a]()},\n!1)})});\n", 
 "init": "pow={};pow.log=function(){\"console\"in window&&console.log&&pow.log.enabled&&console.log.apply(console,arguments)};pow.log.enabled=!0;pow.log(\"{POW!}\");pow.module=function(b,e){var f=pow.module.info[b]||{version:-1},a=pow.module.loading;a&&a[b]<=f.version||(pow.module.info[b]={version:a?a[b]:\"dev\"},pow.log(\"Running module [\"+b+\"].\"),e())};pow.module.info={};pow.updating=\"#update\"==window.location.hash;\npow.bundle=function(b){function e(){var a=document.getElementsByTagName(\"script\");return a[a.length-1]}function f(){pow.log(\"Running bundle {\"+c+\"}.\");pow.module.loading=b.versions;eval(b.data);delete pow.module.loading}var a=e(),c=a.src||a.getAttribute(\"data-origin\"),g=a.parentNode;if(a.hasAttribute(\"data-origin\")){if(pow.updating&&!a.hasAttribute(\"data-loaded\")){pow.log(\"Updating bundle {\"+c+\"}.\");document.write('<script src=\"'+c+'\"><\\/script>');var h=e();h.addEventListener(\"load\",function(){pow.log(\"Successfully updated bundle {\"+\nc+\"}.\");g.removeChild(a)},!1);h.addEventListener(\"error\",function(){pow.log(\"Failed to update bundle {\"+c+\"}. Using local version.\");g.removeChild(h);f()},!1)}else f();a.removeAttribute(\"data-loaded\")}else{pow.log(\"Inlining loaded bundle {\"+c+\"}.\");var d=document.createElement(\"script\");d.innerHTML=b.wrap.replace(\"~b~\",JSON.stringify(b));d.setAttribute(\"data-origin\",c);d.setAttribute(\"data-loaded\",!0);g.removeChild(a);g.insertBefore(d,d.nextSibling)}};\n", 
 "versions": {
  "compat": 1301140841, 
  "core": 1301140841, 
  "init": 1300267106, 
  "nav": 1301140920, 
  "slides": 1301140841, 
  "ui": 1300697478
 }, 
 "wrap": "// <body style=\"display:none\" onload=\"window.location.href='http://usepow.com/about'+window.location.hash\">\n// POW: a simple javascript presentation tool.\n// source code: http://github.com/chromakode/pow\n(function(b) { if (!window.pow) eval(b.init); pow.bundle(b); })(~b~)"
})