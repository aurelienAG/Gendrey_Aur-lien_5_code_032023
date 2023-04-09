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
    let qty = quantities[i]; 
    
   
    qty.addEventListener("change", event => {
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
function clearQuantityAndPrice(){
  totalQuantity.innerText = "";
  totalPrice.innerText = "";
};
  for(let i = 0 ; i < deleteBtn.length && cartInLs.length && itemCard.length; i++){
  let btn = deleteBtn[i];
  let itemTargeted= itemCard[i];
  
  btn.addEventListener("click", event => {
    event.preventDefault(); 
   cartInLs.splice(itemTargeted, 1); 
   itemTargeted.remove();
   localStorage.setItem("cart", JSON.stringify(cartInLs));
  sumTotal(); 
  cartInLs.length === 0 ? clearQuantityAndPrice() && localStorage.clear(): console.log(cartInLs.length);  
  });
  }; 

  // validation et envoi du formulaire

 let firstNameInput = document.querySelector("#firstName");
 console.log(firstNameInput);
 let lastNameInput = document.querySelector("#lastName");
 console.log(lastNameInput);
 let addressInput = document.querySelector("#address");
 console.log(addressInput);
 let cityInput = document.querySelector("#city");
 console.log(cityInput); 
 let emailInput = document.querySelector("#email");
 console.log(emailInput); 

 const submitBtn = document.querySelector("#order"); 
    
     submitBtn.addEventListener("click", event => {
      event.preventDefault(); 
     
      const firstName = firstNameInput.value; 
      const lastName = lastNameInput.value; 
      const address = addressInput.value; 
      const city = cityInput.value; 
      const email = emailInput.value; 
     
      const contact = {
        firstName: firstName, 
        lastName: lastName, 
        address: address, 
        city: city, 
        email: email 
      }; 

      console.log(contact);
        let regExAddress = new RegExp('[a-zA-Z0-9\s\,\\-]*', 'g');
        let regExEmail = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
        let regExNames = new RegExp('^[a-zA-Z\é\è\ê\-]{2,30}', 'g');
        let testNames = regExNames.test(firstName && lastName && city); 
        let testAddress = regExAddress.test(address);
        let testEmail = regExEmail.test(email);
        
        let productsIds = []; 
         for (let i = 0; i < cartInLs.length ; i++){
          productsIds.push(cartInLs[i].id); 
          console.log(productsIds);
         }

        if (testNames && testAddress && testEmail === false)
        {
          console.log("ne pas envoyer le formulaire")
        } else
        {
          const sendToBackEnd = {
            contact, 
            products: productsIds
          }
          console.log(sendToBackEnd);
          const options = {
  
            method: "POST",
            body: JSON.stringify(sendToBackEnd),
            headers: {
              "Content-Type": "application/json" 
            }, 
            };
            
            const postRequest = fetch("http://localhost:3000/api/products/order",options);
               postRequest.then(async(response)=>{
                 try{
            console.log(response); 
            const backEndResponse = await response.json(); 
            localStorage.clear();
            localStorage.setItem("order_id",JSON.stringify(backEndResponse.orderId));
            window.location.href = "confirmation.html";
            
                 }catch(e){
                   console.log(e);
                 }
               })
          
        };

      } 
      
    ) 