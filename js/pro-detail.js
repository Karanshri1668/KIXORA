/* =========================
   SCROLL TO TOP
========================= */
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });
});


/* =========================
   GET ID
========================= */

const params = new URLSearchParams(
    window.location.search
);

const productId = params.get("id");


/* =========================
   FETCH PRODUCT DATA
========================= */

fetch("js/shoes.json")

.then(res => res.json())

.then(data=>{

    /* FIND PRODUCT */

    const product=data.find(
        p=>String(p.id)===String(productId)
    );


    /* PRODUCT NOT FOUND */

    if(!product){

        console.error(
            "Product not found:",
            productId
        );

        return;
    }


    /* =========================
       MAIN PRODUCT
    ========================= */

    document.getElementById(
        "productImage"
    ).src=
    product.image_url ||
    `assets/images/shoes/shoe-${product.id}.png`;


    document.getElementById(
        "productTitle"
    ).textContent=
    product.title;


    document.getElementById(
        "productPrice"
    ).textContent=
    product.price;


    document.getElementById(
        "productBrand"
    ).textContent=
    product.brand;


    /* =========================
       COLOR
    ========================= */

    document.getElementById(
        "colorCircle"
    ).style.background=
    product.primary_color_hex;


    document.body.style.background=`

    radial-gradient(
    circle at center,
    ${product.primary_color_hex}40,
    #CBDDE9
    )

    `;



    /* =========================
       THUMBNAILS
    ========================= */

    const thumbContainer=
    document.getElementById(
        "thumbContainer"
    );

    thumbContainer.innerHTML="";

    for(let i=0;i<5;i++){

        const thumb=
        document.createElement("img");

        thumb.src=
        product.image_url;

        thumb.addEventListener(
            "click",
            ()=>{

                document.getElementById(
                    "productImage"
                ).src=
                thumb.src;

            }
        );

        thumbContainer.appendChild(
            thumb
        );

    }



    /* =========================
       MORE SHOES
    ========================= */

    const otherShoes=
    data.filter(
        p=>p.id!==product.id
    );

    let index=0;

    const container=
    document.getElementById(
        "moreShoes"
    );

    const loadBtn=
    document.getElementById(
        "loadMore"
    );


    // function loadMore(){

    //     for(let i=0;i<6;i++){

    //         if(
    //             index>=otherShoes.length
    //         ){

    //             loadBtn.style.display=
    //             "none";

    //             return;
    //         }

    //         const item=
    //         otherShoes[index];

    //         const img=
    //         document.createElement(
    //             "img"
    //         );

    //         img.src=
    //         item.image_url ||
    //         `assets/images/shoes/shoe-${item.id}.png`;


    //         img.dataset.id=
    //         item.id;


    //         img.addEventListener(
    //             "click",
    //             ()=>{

    //                 window.location.href=
    //                 `product.html?id=${img.dataset.id}`;

    //             }
    //         );

    //         container.appendChild(
    //             img
    //         );

    //         index++;

    //     }

    // }

    function loadMore(){

for(let i=0;i<6;i++){

if(index>=otherShoes.length){

loadBtn.style.display="none";

return;

}

const item=otherShoes[index];


/* CARD */

const card=
document.createElement("div");

card.classList.add("card");


card.innerHTML=`

<img src="${
item.image_url ||
`assets/images/shoes/shoe-${item.id}.png`
}">

<h3>
${item.title}
</h3>

<p>
${item.price}
</p>

<button>
Add To Cart
</button>

`;


/* OPEN PRODUCT */

card.addEventListener(
"click",
()=>{

window.location.href=
`product.html?id=${item.id}`;

}
);


container.appendChild(
card
);

index++;

}

}


    loadMore();


    loadBtn.addEventListener(
        "click",
        ()=>{

            loadMore();

            window.scrollBy({

                top:200,
                behavior:"smooth"

            });

        }
    );



    /* =========================
       3D SHOE TILT
    ========================= */

    const shoe=
    document.getElementById(
        "productImage"
    );


    shoe.addEventListener(
        "mousemove",
        (e)=>{

            const rect=
            shoe.getBoundingClientRect();

            const x=
            e.clientX-rect.left;

            const y=
            e.clientY-rect.top;

            const midX=
            rect.width/2;

            const midY=
            rect.height/2;


            const rotateY=
            ((x-midX)/midX)*10;


            const rotateX=
            ((y-midY)/midY)*-10;


            shoe.style.transform=`

            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)

            `;

        }
    );


    shoe.addEventListener(
        "mouseleave",
        ()=>{

            shoe.style.transform=`

            rotateX(0deg)
            rotateY(0deg)
            scale(1)

            `;

        }
    );


})

.catch(err=>{

console.error(
"Fetch error:",
err
);

});