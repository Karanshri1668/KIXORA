/* =========================
   HERO ANIMATION (GSAP)
========================= */
gsap.from(".hero-content h1", {
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power3.out"
});

gsap.from(".hero-content p", {
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

gsap.from(".hero-image img", {
  x: 100,
  opacity: 0,
  duration: 1
});



// const searchInput = document.getElementById("searchInput");

// let shoeData=[];

// fetch("shoes.json")
// .then(res=>res.json())
// .then(data=>{
//     shoeData=data;
// });

// searchInput.addEventListener("input",()=>{

//     const value=searchInput.value.toLowerCase();

//     const result=shoeData.filter(shoe=>

//         shoe.title.toLowerCase().includes(value)
//         ||
//         shoe.brand.toLowerCase().includes(value)

//     );

//     console.log(result);

// });



const heroShoe = document.getElementById("heroShoe");
const shoeShape = document.getElementById("shoeShape");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");


const shoes=[

{
img:"assets/images/shoes/shoe-000.png",
color:"#2872A1",
shape:"60% 40% 50% 50% / 50% 60% 40% 50%"
},

{
img:"assets/images/shoes/shoe-001.png",
color:"#F85B5B",
shape:"50% 60% 30% 70% / 60% 30% 70% 40%"
},

{
img:"assets/images/shoes/shoe-002.png",
color:"#7B68EE",
shape:"40% 60% 60% 40% / 50% 30% 70% 50%"
},

{
img:"assets/images/shoes/shoe-003.png",
color:"#2EBD85",
shape:"70% 30% 50% 50% / 40% 70% 30% 60%"
}

];


let current=0;


/* DIRECTION */
function updateHero(direction){

let exitX=
direction==="next"
? -200
: 200;


let enterX=
direction==="next"
? 200
: -200;


/* OLD SHOE EXIT */

gsap.to(heroShoe,{

x:exitX,
opacity:0,
duration:.5,

onComplete:()=>{

heroShoe.src=
shoes[current].img;

shoeShape.style.background=
shoes[current].color;

shoeShape.style.borderRadius=
shoes[current].shape;


/* NEW SHOE START */

gsap.set(heroShoe,{
x:enterX,
opacity:0
});


/* NEW SHOE ENTER */

gsap.to(heroShoe,{

x:0,
opacity:1,
duration:.6,
ease:"power3.out"

});

}

});

}


/* NEXT */

nextBtn.addEventListener(
"click",
()=>{

current++;

if(current>=shoes.length){

current=0;

}

updateHero("next");

}
);


/* PREVIOUS */

prevBtn.addEventListener(
"click",
()=>{

current--;

if(current<0){

current=shoes.length-1;

}

updateHero("prev");

}
);



const wrapper = document.getElementById("dockWrapper");

const totalShoes = 80;
const rows = 5;
const perRow = Math.ceil(totalShoes / rows);

let currentIndex = 0;

for (let r = 0; r < rows; r++) {

  const row = document.createElement("div");
  row.classList.add("dock-row");

  for (let i = 0; i < perRow; i++) {

    if (currentIndex >= totalShoes) break;

    let num = String(currentIndex).padStart(3, "0");

    const img = document.createElement("img");

    img.src = `assets/images/shoes/shoe-${num}.png`;
    img.dataset.id = num;

    /* CLICK */
    img.addEventListener("click", () => {
      window.location.href = `product.html?id=${img.dataset.id}`;
    });

    addDockEffect(img);

    row.appendChild(img);
    currentIndex++;
  }

  wrapper.appendChild(row);
}


/* =========================
   DOCK EFFECT
========================= */
function addDockEffect(img) {

  img.addEventListener("mousemove", (e) => {

    let item = e.currentTarget;
    let rect = item.getBoundingClientRect();

    let offset = (e.clientX - rect.left) / rect.width;

    let prev = item.previousElementSibling;
    let next = item.nextElementSibling;

    let scale = 0.5;

    if (prev) {
      prev.style.setProperty("--scale", 1 + scale * (1 - offset));
    }

    item.style.setProperty("--scale", 1 + scale);

    if (next) {
      next.style.setProperty("--scale", 1 + scale * offset);
    }
  });

  img.addEventListener("mouseleave", resetRow);
}


/* =========================
   RESET
========================= */
function resetRow(e) {
  const row = e.currentTarget.parentElement;

  row.querySelectorAll("img").forEach(img => {
    img.style.setProperty("--scale", 1);
  });
}

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

/* BIG TEXT */
gsap.from(".jp-text",{

    y:100,
    opacity:0,
    duration:1,

    scrollTrigger:{
        trigger:".mindset",
        start:"top 70%",
        toggleActions:"play reverse play reverse"
    }

});


/* SMALL TEXT */
gsap.from(".roman-text",{

    y:50,
    opacity:0,
    duration:1,

    scrollTrigger:{
        trigger:".mindset",
        start:"top 65%",
        toggleActions:"play reverse play reverse"
    }

});

gsap.registerPlugin(ScrollTrigger);


/* SECTION ANIMATION */

gsap.from(".drop-left",{

x:-100,
opacity:0,
duration:1,

scrollTrigger:{

trigger:".drop-zone",
start:"top 70%"
}

});


gsap.from(".drop-shoe",{

x:100,
opacity:0,
duration:1,

scrollTrigger:{

trigger:".drop-zone",
start:"top 70%"
}

});


/* COUNTDOWN */

const targetDate=new Date();

targetDate.setDate(
targetDate.getDate()+15
);

function updateCountdown(){

const now=new Date();

const difference=
targetDate-now;


const days=
Math.floor(
difference/(1000*60*60*24)
);

const hours=
Math.floor(
difference/(1000*60*60)%24
);

const minutes=
Math.floor(
difference/(1000*60)%60
);

const seconds=
Math.floor(
difference/1000%60
);

document.getElementById("days").innerText=days;
document.getElementById("hours").innerText=hours;
document.getElementById("minutes").innerText=minutes;
document.getElementById("seconds").innerText=seconds;

}

setInterval(
updateCountdown,
1000
);

updateCountdown();



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