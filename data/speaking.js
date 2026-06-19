const speakingContainer=document.getElementById("speakingCards")

for(let i=1;i<=40;i++){

const card=document.createElement("div")
card.className="card"

card.innerHTML=`

<h3>Topic ${i}</h3>

<ul>
<li>Describe a place you enjoy visiting</li>
<li>Where it is</li>
<li>When you usually go there</li>
<li>Why you like it</li>
</ul>

<br>

<strong>Follow‑up</strong>

<ul>
<li>Why do people enjoy visiting new places?</li>
<li>How does travel influence people's perspectives?</li>
<li>Do cities benefit from tourism?</li>
</ul>

`

speakingContainer.appendChild(card)

}
