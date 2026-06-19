/* =========================
   HELPERS
========================= */

const $ = (s)=>document.querySelector(s)
const $$ = (s)=>document.querySelectorAll(s)



/* =========================
   ROUTER
========================= */

function showPage(id){

$$(".page").forEach(p=>{
p.classList.remove("active")
})

$("#"+id).classList.add("active")

window.scrollTo(0,0)

}

$$(".nav-link").forEach(btn=>{

btn.addEventListener("click",()=>{

const page = btn.dataset.page
showPage(page)

})

})



/* =========================
   TYPEWRITER
========================= */

const texts = [

"Practice IELTS the smart way.",
"Improve speaking with real cue cards.",
"Train writing with real exam tasks.",
"Prepare faster and score higher."

]

let textIndex = 0
let charIndex = 0

function type(){

const el = $("#typewriter")

if(!el) return

const current = texts[textIndex]

el.textContent = current.slice(0,charIndex)

charIndex++

if(charIndex>current.length){

setTimeout(()=>{
charIndex=0
textIndex=(textIndex+1)%texts.length
},1500)

}else{

setTimeout(type,45)

}

}

type()



/* =========================
   BUILD WRITING CARDS
========================= */

function buildWriting(){

const container = $("#writing-container")

if(!container) return

window.writingTopics.forEach(topic=>{

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

<h3>${topic.title}</h3>

<p>${topic.prompt}</p>

`

container.appendChild(card)

})

}

buildWriting()



/* =========================
   BUILD SPEAKING CARDS
========================= */

function buildSpeaking(){

const container = $("#speaking-container")

if(!container) return

window.speakingCueCards.forEach((cardData,i)=>{

const card = document.createElement("div")
card.className="card"

card.innerHTML=`

<h3>${cardData.title}</h3>

<ul>
<li>${cardData.point1}</li>
<li>${cardData.point2}</li>
<li>${cardData.point3}</li>
<li>${cardData.point4}</li>
</ul>

<button class="follow-btn">Follow‑up Questions</button>

<div class="follow-ups">

<ul>
<li>${cardData.followUpQuestions[0]}</li>
<li>${cardData.followUpQuestions[1]}</li>
<li>${cardData.followUpQuestions[2]}</li>
<li>${cardData.followUpQuestions[3]}</li>
</ul>

</div>

`

container.appendChild(card)

})

}

buildSpeaking()



/* =========================
   FOLLOW UP TOGGLE
========================= */

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("follow-btn")){

const box = e.target.nextElementSibling

box.classList.toggle("show")

}

})



/* =========================
   SEARCH SYSTEM
========================= */

const openSearch = $("#open-search")
const closeSearch = $("#close-search")
const overlay = $("#search-overlay")
const input = $("#search-input")
const results = $("#search-results")

openSearch.onclick=()=>{
overlay.classList.add("active")
input.focus()
}

closeSearch.onclick=()=>{
overlay.classList.remove("active")
input.value=""
results.innerHTML=""
}

input.addEventListener("input",()=>{

const q = input.value.toLowerCase()

results.innerHTML=""

if(q.length<2) return


const writing = window.writingTopics.filter(t=>
t.title.toLowerCase().includes(q)
)

const speaking = window.speakingCueCards.filter(t=>
t.title.toLowerCase().includes(q)
)

writing.forEach(t=>{

const item=document.createElement("div")
item.className="search-item"
item.textContent="Writing: "+t.title

item.onclick=()=>{
overlay.classList.remove("active")
showPage("writing")
}

results.appendChild(item)

})


speaking.forEach(t=>{

const item=document.createElement("div")
item.className="search-item"
item.textContent="Speaking: "+t.title

item.onclick=()=>{
overlay.classList.remove("active")
showPage("speaking")
}

results.appendChild(item)

})

})



/* =========================
   CURSOR PHYSICS
========================= */

const dot = $(".cursor-dot")
const ring = $(".cursor-ring")

let mouseX=0
let mouseY=0

let ringX=0
let ringY=0

document.addEventListener("mousemove",(e)=>{

mouseX=e.clientX
mouseY=e.clientY

dot.style.left=mouseX+"px"
dot.style.top=mouseY+"px"

})

function animateCursor(){

ringX += (mouseX-ringX)*0.15
ringY += (mouseY-ringY)*0.15

ring.style.left=ringX+"px"
ring.style.top=ringY+"px"

requestAnimationFrame(animateCursor)

}

animateCursor()



/* =========================
   THREE BACKGROUND
========================= */

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(

75,
window.innerWidth/window.innerHeight,
0.1,
1000

)

const renderer = new THREE.WebGLRenderer({
alpha:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

document.getElementById("three-bg").appendChild(renderer.domElement)



const particles = 200

const geometry = new THREE.BufferGeometry()

const positions = new Float32Array(particles*3)

for(let i=0;i<particles*3;i++){

positions[i]=(Math.random()-0.5)*60

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

const material = new THREE.PointsMaterial({
color:0x4ea1ff,
size:0.2
})

const mesh = new THREE.Points(geometry,material)

scene.add(mesh)

camera.position.z=20



function animate(){

requestAnimationFrame(animate)

mesh.rotation.y+=0.0007
mesh.rotation.x+=0.0004

renderer.render(scene,camera)

}

animate()



window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})
