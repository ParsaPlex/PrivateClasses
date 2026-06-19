(() => {
"use strict";

const $ = (s,scope=document)=>scope.querySelector(s);
const $$ = (s,scope=document)=>Array.from(scope.querySelectorAll(s));

/* ---------------- PRELOADER ---------------- */

function initLoader(){

const loader=document.getElementById("app-loader");
if(!loader) return;

window.addEventListener("load",()=>{
setTimeout(()=>{
loader.classList.add("loaded");
},500);
});

}

/* ---------------- NAVIGATION ---------------- */

let currentPage="home";

function showPage(id){

if(!id || id===currentPage) return;

const pages=$$(".page");

pages.forEach(p=>p.classList.remove("page-active"));

const target=document.getElementById(id);

if(target){
target.classList.add("page-active");
currentPage=id;
window.scrollTo({top:0,behavior:"smooth"});
}

}

function initNavigation(){

$$("[data-go]").forEach(btn=>{
btn.addEventListener("click",()=>{
showPage(btn.dataset.go);
});
});

}

/* ---------------- TYPEWRITER ---------------- */

function initTypewriter(){

const el=$("#typewriterText");
if(!el) return;

const lines=[
"Real language improves with real practice.",
"Speak more. Write more. Learn faster.",
"Consistent IELTS practice builds confidence.",
"Fluency comes from using the language daily."
];

let line=0;
let char=0;
let deleting=false;

function tick(){

const text=lines[line];

if(!deleting){

char++;
el.textContent=text.slice(0,char);

if(char===text.length){
deleting=true;
setTimeout(tick,1500);
return;
}

}else{

char--;
el.textContent=text.slice(0,char);

if(char===0){
deleting=false;
line=(line+1)%lines.length;
}

}

setTimeout(tick,deleting?40:60);

}

tick();

}

/* ---------------- WRITING CARDS ---------------- */

function buildWritingCards(){

const container=$("#writing-container") || $("#writingGrid");

if(!container) return;
if(!Array.isArray(window.writingTopics)) return;

container.innerHTML="";

window.writingTopics.forEach((topic,i)=>{

const card=document.createElement("article");
card.className="content-card";

card.innerHTML=`

<div class="card-topline">
Writing Task ${i+1}
</div>

<h3>${topic.title || "Writing Task"}</h3>

<p>
${topic.prompt || ""}
</p>

<div class="card-footer">
<span class="tag">IELTS Writing</span>
<span class="tag">Practice</span>
</div>

`;

container.appendChild(card);

});

}

/* ---------------- SPEAKING CARDS ---------------- */

function buildSpeakingCards(){

const container=$("#speaking-container") || $("#speakingGrid");

if(!container) return;
if(!Array.isArray(window.speakingCueCards)) return;

container.innerHTML="";

window.speakingCueCards.forEach((card,i)=>{

const points=card.points ||
[card.point1,card.point2,card.point3,card.point4].filter(Boolean);

const follow=card.followUpQuestions || [];

const article=document.createElement("article");
article.className="content-card";

article.innerHTML=`

<div class="card-topline">
Cue Card ${i+1}
</div>

<h3>${card.title || "Speaking Cue Card"}</h3>

<p><strong>You should say:</strong></p>

<ul>
${points.map(p=>`<li>${p}</li>`).join("")}
</ul>

<button class="btn-followup">
Show Follow‑ups
</button>

<div class="followup-content hidden">
${follow.length
?follow.map(q=>`<div class="followup-item">${q}</div>`).join("")
:`<div class="followup-item">No follow‑ups added yet.</div>`
}
</div>

<div class="card-footer">
<span class="tag">IELTS Speaking</span>
<span class="tag">Cue Card</span>
</div>

`;

container.appendChild(article);

});

}

/* ---------------- FOLLOWUP TOGGLE ---------------- */

function initFollowups(){

document.addEventListener("click",(e)=>{

const btn=e.target.closest(".btn-followup");
if(!btn) return;

const card=btn.closest(".content-card");
const content=$(".followup-content",card);

if(!content) return;

content.classList.toggle("hidden");

btn.textContent=
content.classList.contains("hidden")
? "Show Follow‑ups"
: "Hide Follow‑ups";

});

}

/* ---------------- HEADER SCROLL ---------------- */

function initHeader(){

const header=$("#siteHeader .navbar");
if(!header) return;

window.addEventListener("scroll",()=>{
header.classList.toggle("is-scrolled",window.scrollY>20);
},{passive:true});

}

/* ---------------- BOOT ---------------- */

function boot(){

initLoader();
initNavigation();
initHeader();
buildWritingCards();
buildSpeakingCards();
initFollowups();
initTypewriter();

}

document.addEventListener("DOMContentLoaded",boot);

})();
