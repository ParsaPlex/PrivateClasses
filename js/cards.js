function loadWriting(){

const container=document.getElementById("writingContainer")

writingTopics.forEach(topic=>{

const card=document.createElement("div")
card.className="card"

card.innerHTML=`
<h3>${topic.title}</h3>
<p>${topic.prompt}</p>
`

container.appendChild(card)

})

}

function loadSpeaking(){

const container=document.getElementById("speakingContainer")

speakingCueCards.forEach(card=>{

const div=document.createElement("div")
div.className="card"

div.innerHTML=`
<h3>${card.title}</h3>
<ul>
${card.points.map(p=>`<li>${p}</li>`).join("")}
</ul>
`

container.appendChild(div)

})

}

loadWriting()
loadSpeaking()
