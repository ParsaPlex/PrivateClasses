const pages=document.querySelectorAll(".page")

function showPage(id){

pages.forEach(p=>p.classList.remove("active"))

document.getElementById(id).classList.add("active")

window.scrollTo(0,0)

}
