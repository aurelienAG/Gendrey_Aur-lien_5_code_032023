const cartInLs = JSON.parse(localStorage.getItem("cart")); 

let productBloc = []; 

let displayCart = document.querySelector("#cart__items"); 

for (let i = 0 ; i < cartInLs.length ; i++){
  productBloc = productBloc + `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="${cartInLs[i].image}" alt="Photographie d'un canapé">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${cartInLs[i].name}</h2>
      <p>Couleur: ${cartInLs[i].option}</p>
      <p> Prix: <span class="unitPrice">${cartInLs[i].unitPrice}</span>€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartInLs[i].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`
displayCart.innerHTML = productBloc;
};

const totalPrice = document.querySelector("#totalPrice"); 
const totalQuantity = document.querySelector("#totalQuantity")
let prices = document.getElementsByClassName("unitPrice"); 
let quantities = document.getElementsByClassName("itemQuantity"); 

  for ( let i = 0; i < quantities.length; i++){
    let qty = quantities[i] 
    qty.addEventListener("click", event => {
    event.preventDefault(); 
      let theLs =  cartInLs;  
      let storageValue = cartInLs[i].quantity; 
      let newValue = parseInt(qty.value);
      newValue != storageValue ?  theLs[i].quantity = newValue : console.log("foo");
      localStorage.setItem("cart", JSON.stringify(theLs));
 sumTotal(); 
}) 
}

function sumTotal(){ 

  let pricesArray = []; 
  let quantitiesArray = []; 
  
  for (let i = 0 ; i < prices.length && quantities.length ; i++){
  let allPrices = parseInt(prices[i].innerText);
  let allQuantities = parseInt(quantities[i].value); 
  let finalsPrices = allQuantities * allPrices;   
  
  pricesArray.push(finalsPrices); 
  let initialValue = 0;
   const sumPrices = pricesArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue 
   );
   totalPrice.innerText = sumPrices; 
   
  quantitiesArray.push(allQuantities); 
  let initialValue2 = 0; 
  const sumQuantities = quantitiesArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initialValue2 
   ); 
   totalQuantity.innerText = sumQuantities; 
  
  } 
};

sumTotal(); 

var deleteBtn = document.getElementsByClassName("deleteItem"); 
var itemCard = document.getElementsByClassName("cart__item"); 

  for(let i = 0 ; i < deleteBtn.length && cartInLs.length && itemCard.length; i++){
  let btn = deleteBtn[i];
  let removeDom = itemCard[i];
  btn.addEventListener("click", event => {
    event.preventDefault(); 
   cartInLs.splice(i, 1); 
   removeDom.remove();
   localStorage.setItem("cart", JSON.stringify(cartInLs));
  sumTotal(); 
  cartInLs.length < 1 || 0 ? totalQuantity.innerText = "" && localStorage.clear(): console.log("bar");  
  cartInLs.length < 1 || 0 ? totalPrice.innerText = "" && localStorage.clear(): console.log("foo");  
  });
  }; 