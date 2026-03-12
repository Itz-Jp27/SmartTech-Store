// PRODUCTS
const products = [
{
name:"iPhone 15",
price:79999,
category:"apple",
img:"https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500"
},

{
name:"iPhone 15 Pro",
price:134999,
category:"apple",
img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
},

{
name:"iPhone 14",
price:69999,
category:"apple",
img:"https://images.unsplash.com/photo-1603898037225-1d3d0a7f6209?w=500"
},

{
name:"Samsung Galaxy S23",
price:74999,
category:"samsung",
img:"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500"
},

{
name:"Samsung Galaxy S24",
price:85999,
category:"samsung",
img:"https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500"
},

{
name:"Samsung Galaxy Z Fold",
price:149999,
category:"samsung",
img:"https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
},

{
name:"Xiaomi 13 Pro",
price:59999,
category:"xiaomi",
img:"https://images.unsplash.com/photo-1510552776732-01acc3a2f54c?w=500"
},

{
name:"Redmi Note 13 Pro",
price:23999,
category:"xiaomi",
img:"https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=500"
},

{
name:"Poco F5",
price:29999,
category:"xiaomi",
img:"https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500"
},

{
name:"Asus ROG Phone 7",
price:69999,
category:"gaming",
img:"https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500"
},

{
name:"RedMagic 8 Pro",
price:64999,
category:"gaming",
img:"https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500"
},

{
name:"iQOO Neo 7",
price:32999,
category:"gaming",
img:"https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500"
},

{
name:"Realme Narzo 60",
price:14999,
category:"budget",
img:"https://images.unsplash.com/photo-1567581935884-3349723552ca?w=500"
},

{
name:"Redmi 12",
price:12999,
category:"budget",
img:"https://images.unsplash.com/photo-1512499617640-c2f999098c01?w=500"
},

{
name:"Samsung Galaxy A14",
price:16999,
category:"budget",
img:"https://images.unsplash.com/photo-1598327106026-d9521da673d1?w=500"
}

];
// duplicate to reach 50+
while(products.length < 40){
products.push({...products[Math.floor(Math.random()*products.length)]});
}

// RENDER PRODUCTS

const container = document.getElementById("product-list");

function renderProducts(list){

container.innerHTML="";

list.forEach(p=>{

container.innerHTML+=`

<div class="product ${p.category}" data-price="${p.price}">

<img src="${p.img}">

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>

</div>

`;

});

}

renderProducts(products);


// CART SYSTEM

let cart = JSON.parse(localStorage.getItem("cart")) || {};


function addToCart(name,price){

if(cart[name]){

if(cart[name].qty >= 10){
alert("Out of stock");
return;
}

cart[name].qty++;

}else{

cart[name] = {price:price, qty:1};

}

updateCart();
showPopup();

}


function updateCart(){

let cartContainer = document.getElementById("cart-items");

cartContainer.innerHTML="";

let total=0;
let count=0;

for(let item in cart){

cartContainer.innerHTML+=`

<div class="cart-item">

<span>${item}</span>

<div class="qty-controls">

<button onclick="changeQty('${item}',-1)">-</button>
<span>${cart[item].qty}</span>
<button onclick="changeQty('${item}',1)">+</button>

</div>

<button onclick="removeItem('${item}')">✖</button>

</div>

`;

total += cart[item].price * cart[item].qty;
count += cart[item].qty;

}

document.getElementById("cart-total").innerText = total;
document.getElementById("cart-count").innerText = count;

localStorage.setItem("cart",JSON.stringify(cart));

}


function changeQty(name,amount){

cart[name].qty += amount;

if(cart[name].qty <= 0){
delete cart[name];
}

if(cart[name] && cart[name].qty > 10){
cart[name].qty = 10;
alert("Max 10 allowed");
}

updateCart();

}


function removeItem(name){

delete cart[name];

updateCart();

}


function toggleCart(){

document.getElementById("cart").classList.toggle("active");
document.getElementById("cart-overlay").classList.toggle("active");

}


function showPopup(){

let popup = document.getElementById("popup");

popup.style.display="block";

setTimeout(()=>popup.style.display="none",1500);

}


// SEARCH

document.getElementById("search").addEventListener("keyup",function(){

let value = this.value.toLowerCase();

let filtered = products.filter(p => p.name.toLowerCase().includes(value));

renderProducts(filtered);

document.getElementById("no-products").style.display = filtered.length ? "none" : "block";

});


// SORT

document.getElementById("sort").addEventListener("change",function(){

let sorted=[...products];

sorted.sort((a,b)=>this.value==="low"?a.price-b.price:b.price-a.price);

renderProducts(sorted);

});


// CATEGORY FILTER

function filterCategory(cat){

if(cat==="all") return renderProducts(products);

renderProducts(products.filter(p=>p.category===cat));

}


// THEME TOGGLE

const toggle=document.getElementById("themeToggle");

let theme=localStorage.getItem("theme");

if(theme==="light"){
document.body.classList.add("light");
toggle.innerText="☀️";
}

toggle.onclick=()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
localStorage.setItem("theme","light");
toggle.innerText="☀️";
}else{
localStorage.setItem("theme","dark");
toggle.innerText="🌙";
}

};


updateCart();

