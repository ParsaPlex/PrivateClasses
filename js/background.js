const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000)

const renderer=new THREE.WebGLRenderer({
canvas:document.getElementById("alphabet-bg"),
alpha:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.z=60

const letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const material=new THREE.MeshBasicMaterial({color:0xff7a00,wireframe:true})

for(let i=0;i<60;i++){

const geometry=new THREE.BoxGeometry(2,2,2)

const cube=new THREE.Mesh(geometry,material)

cube.position.x=(Math.random()-0.5)*100
cube.position.y=(Math.random()-0.5)*100
cube.position.z=(Math.random()-0.5)*100

scene.add(cube)

}

function animate(){

requestAnimationFrame(animate)

scene.rotation.y+=0.0008

renderer.render(scene,camera)

}

animate()
