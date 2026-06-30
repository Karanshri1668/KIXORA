const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener(
"keydown",
(e)=>{

if(e.key==="Enter"){

const query =
searchInput.value.trim();

if(query){

window.location.href =
`search.html?q=${encodeURIComponent(query)}`;

}

}

});

const params =
new URLSearchParams(
window.location.search
);

const query =
params.get("q")
?.toLowerCase()
|| "";

fetch("js/shoes.json")

.then(res=>res.json())

.then(data=>{

const results =
data.filter(shoe=>{

return (

shoe.title
.toLowerCase()
.includes(query)

||

shoe.brand
.toLowerCase()
.includes(query)

);

});


document.getElementById(
"resultCount"
).textContent=

`${results.length} result(s) found`;


const container=
document.getElementById(
"results"
);


results.forEach(shoe=>{

const card=
document.createElement(
"div"
);

card.classList.add(
"search-card"
);

card.innerHTML=`

<img src="${shoe.image_url}">

<h3>
${shoe.title}
</h3>

<p>
${shoe.price}
</p>

`;

card.addEventListener(
"click",
()=>{

window.location.href=
`product.html?id=${shoe.id}`;

}
);

container.appendChild(
card
);

});

});