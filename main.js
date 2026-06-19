const progress=document.getElementById("progress")

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop
const height=document.documentElement.scrollHeight-document.documentElement.clientHeight

progress.style.width=(scrollTop/height)*100+"%"

})


// cursor

const cursor=document.getElementById("cursor")
const dot=document.getElementById("cursor-dot")

window.addEventListener("mousemove",(e)=>{

cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`
dot.style.transform=`translate(${e.clientX}px,${e.clientY}px)`

})


// reveal animation

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("active")
}
})

},{threshold:.2})

document.querySelectorAll(".section").forEach(el=>{
el.classList.add("reveal")
observer.observe(el)
})


// THREE background

const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer=new THREE.WebGLRenderer({
canvas:document.querySelector("#bg"),
alpha:true
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.setSize(window.innerWidth,window.innerHeight)

const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const sprites=[]

for(let i=0;i<120;i++){

const canvas=document.createElement("canvas")
const ctx=canvas.getContext("2d")

canvas.width=64
canvas.height=64

ctx.fillStyle="#2563eb"
ctx.font="40px Arial"
ctx.fillText(
letters[Math.floor(Math.random()*letters.length)],
18,
46
)

const texture=new THREE.CanvasTexture(canvas)
const material=new THREE.SpriteMaterial({map:texture})

const sprite=new THREE.Sprite(material)

sprite.position.set(
(Math.random()-0.5)*15,
(Math.random()-0.5)*15,
(Math.random()-0.5)*10
)

scene.add(sprite)
sprites.push(sprite)

}

camera.position.z=6

function animate(){

requestAnimationFrame(animate)

sprites.forEach(s=>{
s.rotation.z+=0.001
})

renderer.render(scene,camera)

}

animate()

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})
