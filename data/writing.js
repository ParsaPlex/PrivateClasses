const writingContainer=document.getElementById("writingCards")

for(let i=1;i<=40;i++){

const card=document.createElement("div")
card.className="card"

card.innerHTML=`

<h3>Task ${i}</h3>

<p>
Write a letter to a friend explaining a recent change in your life.
Include details about what happened, why it happened, and how you feel about it.
</p>

`

writingContainer.appendChild(card)

}
