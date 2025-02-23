"use strict";(self.webpackChunkcs4241_c25_a2_short_stack=self.webpackChunkcs4241_c25_a2_short_stack||[]).push([[792],{367:(e,t,n)=>{var a=n(235),o=n(71),s=n(399),l=n(333),r=n(128),i=n(963),d=n(814),c=n(38),u=n(359),m=n(787);const p=[["Arobash","Muraudim","Horumak","Dorimar","Babark","Oliwar","Gryuwar","Vanogri","Felagh","Gajener"]],f=[["Orb","Sphere","Staff","Axe","Blade","Hound","Golem","Door","Fleece","Valley"],["Iron","Light","Darkness","Steel","Fire"],["Avernus","Stormcrag","Shadowvale","Thornridge","Ironcliff"]],h=["Golden","Mystic","Fiery","Furious"],g={render:async()=>'\n            <div id="main" class="body-section">\n                <div id="content-feed">\n                </div>\n                <h1 id="card-name" class="text-[2rem] font-[600]"></h1>\n                <button id="randomize" class="button">Randomize</button>\n            </div>',after_render:async()=>{const e=JSON.parse(localStorage.getItem("appState"));function t(e,t){e.style.transition=`opacity ${t/1e3}s`,e.style.opacity=0,setTimeout((()=>{e.style.display="none",document.body.removeChild(e)}),t)}function n(){function e(e){return Math.floor(Math.random()*e)}let t="";switch(e(2)){case 0:{const n=e(p.length),a=e(p[n].length),o=p[n][a],s=e(f[2].length);t=`${o} of ${f[2][s]}`}break;case 1:switch(e(2)){case 0:{const n=e(f[0].length),a=f[0][n],o=e(2)+1,s=e(f[o].length);t=`The ${a} of ${f[o][s]}`}break;case 1:{const n=e(h.length),a=h[n],o=e(f[0].length);t=`The ${a} ${f[0][o]}`}}}return t}const g=document.getElementById("randomize"),v=document.getElementById("card-name");v.textContent=n(),g.addEventListener("click",(()=>{v.textContent=n()})),e.visited||function(){const n=document.createElement("div");var a,o;n.classList.add("welcome-modal-container"),n.innerHTML='\n            <div class="welcome-modal-box">\n                <a class="welcome-modal-title">Greetings, traveler!</a>\n                <p class="welcome-paragraph">Welcome to <a class="inline-bold">Card Collector</a>! A realm where fortune favors the bold and chance decides your destiny! Here, you may summon a card from the mystical depths of the unknown. Will it be an old relic, a powerful artifact, or perhaps a humble token of luck? Only the fates know!</p>\n                <p class="welcome-paragraph">Once you\'ve found a card you like, you may choose to save it to your account, share it with fellow adventurers, or even trade it for a handsome sum! So step forth, my friend, and let the winds of chance guide you. Who knows what wonders await? A card, a trade, and a fortune to be made!</p>\n            </div>',a=n,o=()=>{document.onkeydown=null,t(n,1e3),t(s,1e3),document.getElementById("content-feed").classList.remove("blur"),document.onmousedown=null,e.visited=!0,localStorage.setItem("appState",JSON.stringify(e))},document.onmousedown=e=>{a.contains(e.target)||o()},document.onkeydown=a=>{document.onmousedown=null,t(n,1e3),t(s,1e3),document.getElementById("content-feed").classList.remove("blur"),document.onkeydown=null,e.visited=!0,localStorage.setItem("appState",JSON.stringify(e))};const s=document.createElement("div");s.id="dimming-div",document.getElementById("content-feed").classList.add("blur"),document.body.appendChild(n),document.body.appendChild(s)}(),function(){const e=document.getElementById("content-feed"),t=e.clientWidth,n=e.clientHeight,p=new a.Z;p.background=new o.Q(2039583);const f=new s.u(40,t/n,.01,1e3),h=new l.J;h.shadowMap.enabled=!0,h.shadowMap.type=r.Wk7,h.toneMapping=r.FV,h.toneMappingExposure=1,h.setPixelRatio(window.devicePixelRatio),h.setSize(t,n),h.setAnimationLoop(b),e.appendChild(h.domElement);const g=new i.N(f,h.domElement);g.listenToKeyEvents(window),g.enableZoom=!1,g.enableDamping=!0,g.dampingFactor=.05,g.rotateSpeed=.7,g.maxPolarAngle=Math.PI/2,g.minPolarAngle=Math.PI/2,(new d.t).load("card.stl",(function(e){const t=new c.D({color:16777215});t.side=r.$EB;const n=new u.e(e,t);n.receiveShadow=!0,n.rotation.set(-Math.PI/10,0,0),p.add(n)}),(e=>{}),(e=>{console.log(e)}));const v=new m.n(16777215,100);v.position.set(1,4,1),v.angle=Math.PI/6,v.penumbra=1,v.decay=2,v.distance=0,v.castShadow=!0,v.shadow.mapSize.width=1024,v.shadow.mapSize.height=1024,v.shadow.camera.near=1,v.shadow.camera.far=10,v.shadow.focus=1,p.add(v),f.position.set(0,4,3.5),g.update();let y=!1;function b(){y&&function(){y=!1;const e=document.getElementById("content-feed"),t=e.clientWidth,n=e.clientHeight;f.aspect=t/n,f.updateProjectionMatrix(),h.setSize(t,n)}(),g.update(),h.render(p,f)}window.addEventListener("resize",(()=>{y=!0})),b()}()}},v=async function(e){e.preventDefault();const t={username:document.querySelector("#username").value,password:document.querySelector("#password").value},n=JSON.stringify(t);try{const e=await fetch("/user/auth/login",{headers:{"Content-Type":"application/json"},method:"POST",body:n});if(!(await e.json()).success)throw new Error("Failed to login");window.location.replace("http://localhost:3000/")}catch(e){console.error(e.message);const t=document.getElementById("user-error");if(document.getElementsByClassName("error-message").length<1){const e=document.createElement("a");e.classList.add("error-message"),e.innerHTML="User already exists. Try a new username",t.appendChild(e),setTimeout((()=>{const e=document.getElementById("user-error");e.removeChild(e.lastElementChild)}),1e4)}}},y=async function(e){e.preventDefault();const t=await fetch("/user/auth/github",{method:"GET"}),n=await t.text();console.log(n)},b={render:async()=>'\n            <div id="main" class="body-section">\n                <form class="login-form">\n                    <div class="auth-tabs">\n                        <button class="tab">\n                            <a href="/login">Login</a>\n                        </button>\n                        <button class="tab">\n                            <a href="/signup">Sign Up</a>\n                        </button>\n                    </div>\n                    <div class="form-area">\n                    <div class="form-box">\n                        <label class="form-label" for="username">Username </label>\n                        <input class="form-input" type="text" id="username" value="username">\n                    </div>\n                    <div class="form-box">\n                        <label class="form-label" for="password">Password</label>\n                        <input class="form-input" type="text" id="password" value="password">\n                    </div>\n                    <div class="form-box" id="form-submission">\n                        <button class="form-trigger" type="submit" id="form-button">Login</button>\n                    </div>\n                    <div id="login-error" class="form-label-group">\n                    <div class="login-options">\n                        <button id="gitLogin" class="actionIcon">\n                            <svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" class="octicon">\n                                <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>\n                            </svg> \n                        </button>\n                    </div>\n                    </div>\n                </form>\n            </div>',after_render:async()=>{let e;document.getElementById("form-button").onclick=v,document.getElementById("gitLogin").onclick=y;const t=document.getElementsByClassName("form-input");for(let e=0;e<t.length;e++){const n=t[e];let a=n.defaultValue;n.onkeydown=e=>{"Escape"===e.key&&("contains-data"===n.classList[n.classList.length-1]&&n.classList.remove("contains-data"),n.value=a,n.addEventListener("input",o,{once:!0}),n.blur())};const o=e=>{"insertText"===e.inputType&&(a=n.defaultValue,n.value=e.data)};n.addEventListener("input",o,{once:!0}),n.onblur=()=>{n.value.length>0?n.classList.add("contains-data"):0===n.value.length&&("contains-data"===n.classList[n.classList.length-1]&&n.classList.remove("contains-data"),n.value=a)}}const n=document.getElementById("password");let a="";n.onfocus=()=>{e=n.defaultValue,n.defaultValue="",n.type="password"},n.onkeydown=e=>{"Escape"===e.key&&n.blur()},n.oninput=e=>{"insertText"===e.inputType&&(a=n.value)},n.onblur=()=>{n.defaultValue=e,0===a.length&&(n.type="type")}}},w=async function(e){e.preventDefault();const t={username:document.querySelector("#username").value,firstname:document.querySelector("#firstname").value,lastname:document.querySelector("#lastname").value,dateofbirth:document.querySelector("#dateofbirth").value,password:document.querySelector("#password").value},n=(e=>e.username[0]+e.password[0]+function(e){let t=0;for(let n=0;n<e.length;n++)t=Math.imul(31,t)+e.charCodeAt(n)|0;return t}(e.username+e.password).toString())(t);localStorage.setItem(n,JSON.stringify(t));const a=JSON.stringify(t);try{const e=await fetch("/user/register",{headers:{"Content-Type":"application/json"},method:"POST",body:a});if(!(await e.json()).success)throw new Error("Failed to register user")}catch(e){console.error(e.message);const t=document.getElementById("user-error");if(document.getElementsByClassName("error-message").length<1){const e=document.createElement("a");e.classList.add("error-message"),e.innerHTML="User already exists. Try a new username",t.appendChild(e),setTimeout((()=>{const e=document.getElementById("user-error");e.removeChild(e.lastElementChild)}),1e4)}}},E={render:async()=>'\n            <div id="main" class="body-section">\n                <form class="login-form">\n                    <div class="auth-tabs">\n                        <button class="tab">\n                            <a href="/login">Login</a>\n                        </button>\n                        <button class="tab">\n                            <a href="/signup">Sign Up</a>\n                        </button>\n                    </div>\n                    <div class="form-area">\n                    <div class="form-box">\n                        <div id="user-error" class="form-label-group">\n                            <label class="form-label" for="username">Username </label>\n                        </div>\n                        <input class="form-input" type="text" id="username" value="username">\n                    </div>\n                    <div class="form-group">\n                        <div class="form-box">\n                            <label class="form-label" for="firstname">First Name</label>\n                            <input class="form-input" type="text" id="firstname" value="first name">\n                        </div>\n                        <div class="form-box">\n                            <label class="form-label" for="lastname">Last Name</label>\n                            <input class="form-input" type="text" id="lastname" value="last name">\n                        </div>\n                    </div>\n                    <div class="form-box">\n                        <label class="form-label" for="dob">Date of Birth</label>\n                        <input class="form-input" type="date" id="dateofbirth" value="date of birth">\n                    </div>\n                    <div class="form-box">\n                        <label class="form-label" for="lastname">Password</label>\n                        <input class="form-input" type="text" id="password" value="password">\n                    </div>\n                    <div class="form-box" id="form-submission">\n                        <input class="form-trigger" type="button" id="form-button" value="Sign up">\n                    </div>\n                    </div>\n                </form>\n            </div>',after_render:async()=>{let e;document.getElementById("form-button").onclick=w;const t=document.getElementsByClassName("form-input");for(let e=0;e<t.length;e++){const n=t[e];let a=n.defaultValue;n.onkeydown=e=>{"Escape"===e.key&&("contains-data"===n.classList[n.classList.length-1]&&n.classList.remove("contains-data"),n.value=a,n.addEventListener("input",o,{once:!0}),n.blur())};const o=e=>{"insertText"===e.inputType&&(a=n.defaultValue,n.value=e.data)};n.addEventListener("input",o,{once:!0}),n.onblur=()=>{n.value.length>0?n.classList.add("contains-data"):0===n.value.length&&("contains-data"===n.classList[n.classList.length-1]&&n.classList.remove("contains-data"),n.value=a)}}const n=document.getElementById("password");let a="";n.onfocus=()=>{e=n.defaultValue,n.defaultValue="",n.type="password"},n.onkeydown=e=>{"Escape"===e.key&&n.blur()},n.oninput=e=>{"insertText"===e.inputType&&(a=n.value)},n.onblur=()=>{n.defaultValue=e,0===a.length&&(n.type="type")}}},C=async function(e){e.preventDefault();const t=e.originalTarget.id,n=await fetch("/delete",{method:"POST",body:t}),a=await n.text();return JSON.parse(a)},L=async function(e,t){console.log(e.originalTarget);const n={id:e.originalTarget.id,value:t},a=JSON.stringify(n),o=await fetch("/change",{method:"POST",body:a}),s=await o.text();return JSON.parse(s)},S={render:async()=>{const e=await(async()=>{const e=await fetch("/data/all",{method:"GET"}),t=await e.text(),n=JSON.parse(t);return console.log(n),n})(),t=document.createElement("div");t.classList.add("page-container");for(let n=0;n<e.length;++n){const a=e[n],o=document.createElement("table"),s=document.createElement("tr");for(const[e,t]of Object.entries(a[0])){if("_id"===e)continue;const t=document.createElement("th");t.innerHTML=e,t.setAttribute("headers",e),s.appendChild(t)}const l=document.createElement("th");s.appendChild(l),o.append(s);for(let e=0;e<a.length;e++){const t=document.createElement("tr");for(const[n,o]of Object.entries(a[e])){if("_id"===n)continue;const a=document.createElement("td");a.classList.add("table-cell"),a.setAttribute("header",n+"-"+(e+1)),a.innerHTML=o,t.appendChild(a)}const n=document.createElement("td"),s=document.createElement("button");n.classList.add("delete-cell"),s.setAttribute("id",e.toString()),s.classList.add("delete-button"),s.innerHTML="delete",n.append(s),t.appendChild(n),o.appendChild(t)}const r=document.createElement("div"),i=document.createElement("div");r.classList.add("result-table-container"),i.classList.add("result-table"),i.appendChild(o),r.appendChild(i),t.appendChild(r)}return t.outerHTML},after_render:()=>{let e,t=!1;const n=document.getElementsByClassName("table-cell");for(let a=0;a<n.length;a++){const o=n[a];o.onclick=()=>{if(t=!0,!o.firstChild)return void console.warn("There is no data to edit");if(3!==o.firstChild.nodeType&&!t)return;let n=document.createElement("input");n.setAttribute("id",`${o.attributes.header.value}`),n.setAttribute("size",1),n.classList.add("editable-field"),n.onblur=()=>{t=!1,n.parentNode.innerHTML=e},n.onkeydown=t=>{const a=n.value;switch(t.key){case"Escape":n.blur();break;case"Enter":e=a,L(t,a),n.blur()}},n.onclick=e=>{e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation()},e=o.firstChild.nodeValue,n.value=o.textContent,o.removeChild(o.firstChild),o.appendChild(n),document.getElementById(o.attributes.header.value).focus()}}const a=document.getElementsByClassName("delete-button");for(let e=0;e<a.length;e++)a[e].onclick=async e=>{await C(e).then((()=>{document.querySelector("table").deleteRow(Number(e.originalTarget.id)+1)}))}}};localStorage.setItem("appState",JSON.stringify({visited:!1,card:null})),document.addEventListener("DOMContentLoaded",(()=>{document.body.onclick=e=>{e.target.matches("[data-link]")&&(e.preventDefault(),T(e.target.href))},x()}));const k=[{path:404,title:"Error",view:()=>{console.log("error")}},{path:"/",title:"Collect Your Card • Card Collector",view:g},{path:"/signup",title:"Sign Up • Card Collector",view:E},{path:"/login",title:"Login • Card Collector",view:b},{path:"/results",title:"Card Collector - Results",view:S}],T=async e=>{history.pushState({},"",e),await x()},x=async()=>{let e=k.map((e=>({route:e,ismatch:location.pathname===e.path}))).find((e=>e.ismatch));e||(e={route:k[0],ismatch:!0});let t=await e.route.view.render();document.querySelector("#content").innerHTML=t,document.title=e.route.title,await e.route.view.after_render()};window.onpopstate=x}},e=>{e.O(0,[502],(()=>e(e.s=367))),e.O()}]);