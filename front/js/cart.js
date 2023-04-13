//Récupération des données des articles ajoutés dans le Local Storage
const cartInLs = JSON.parse(localStorage.getItem("cart")); 
console.log(cartInLs);

//Récupérer les prix des articles sans les stocker dans le local storage

let productBloc = []; 

let displayCart = document.querySelector("#cart__items"); 
let selectPricesTag = document.querySelector(".unitPrice"); 

function getProducts(){
const getDataApi = fetch('http://localhost:3000/api/products/')

getDataApi.then(async response => {

  const datas = await response.json(); 
  for (let i = 0 ; i < cartInLs.length && datas.length ; i++){
//Affichage des articles sur la page
let findPrices = datas.find(el=> el._id === cartInLs[i].id); 
let dataPrice;
findPrices != undefined ? dataPrice = findPrices.price : dataPrice = dataPrice;
    productBloc = productBloc + `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${cartInLs[i].image}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${cartInLs[i].name}</h2>
        <p>Couleur: ${cartInLs[i].option}</p>
        <p> Prix: <span class="unitPrice">${dataPrice}</span>€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartInLs[i].quantity}">
          
          </div>
          <p class="alertQuantity" style = "color: yellow;"></p>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`
  displayCart.innerHTML = productBloc;}
  
  
  
  
  
  
    
  
  
  const totalPrice = document.querySelector("#totalPrice"); 
  const totalQuantity = document.querySelector("#totalQuantity")
  let prices = document.getElementsByClassName("unitPrice"); 
  let quantities = document.getElementsByClassName("itemQuantity"); 
  let alertsQuantities = document.getElementsByClassName("alertQuantity");
  
  //Gestion des quantités       
    for (let i = 0; i < quantities.length && alertsQuantities.length; i++){
      let qty = quantities[i]; 
      let errMessageQuantity = alertsQuantities[i];   
     
      qty.addEventListener("change", event => {
      event.preventDefault(); 
      if (qty.value >=1 && qty.value <=100){
        let theLs =  cartInLs;  
        let storageValue = theLs[i].quantity; 
        let newValue = parseInt(qty.value);
        newValue != storageValue ?  theLs[i].quantity = newValue : theLs[i].quantity = theLs[i].quantity;
        localStorage.setItem("cart", JSON.stringify(theLs));
   sumTotal(); 
      } else {
        qty.value > 100 ? qty.value = 100 : console.log(qty.value);
        qty.value  < 1 ? qty.value = parseInt(qty.value) + 1 : console.log(qty.value);
        errMessageQuantity.innerText = `La valeur minimum doit être de 1 et la valeur maximum de 100`;
       }
  }) 
  };
  
  //Calcul du prix total et de la quantité totale 
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
  
  //Gestion de la suppression des articles
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
     console.log(cartInLs);
    sumTotal(); 
    cartInLs.length === 0 ? clearQuantityAndPrice() && localStorage.clear(): console.log(cartInLs.length);  
    });
    }; 
  
  
                      //***Gestion du formulaire ***/ 
    
  // Gestion des erreurs de saisie du formulaire
  let userForm = document.querySelector(".cart__order__form");
  
  var firstName = document.querySelector("#firstName");
  var regExFirstName = new RegExp('^[A-Za-z\é\è\ê\-]{2,20}$','g'); 
  
   userForm.firstName.addEventListener("change", event => {
    event.preventDefault();
    let valueFirstName = firstName.value;
    let testFirstName = regExFirstName.test(valueFirstName); 
    let alert = document.querySelector("#firstNameErrorMsg");
    if(testFirstName) { 
      alert.innerHTML = "";
   } else {
    alert.innerHTML = "Prénom non valide, le champs ne doit contenir ni chiffre ni caractère spécial";
  }       
   });
  
  
   var lastName = document.querySelector("#lastName");
   var regExLastName = new RegExp('^[A-Za-z\é\è\ê\-]{2,20}$','g');
  
   userForm.lastName.addEventListener("change", event => {
    event.preventDefault();
    let testLastName = regExLastName.test(lastName.value); 
    let alert = document.querySelector("#lastNameErrorMsg");
    if(testLastName) { 
      alert.innerHTML = "";
   } else {
    alert.innerHTML = "Nom non valide, le champs ne doit contenir ni chiffre ni caractère spécial";
  }       
   }); 
  
   var address = document.querySelector("#address");
   var regExAddress = new RegExp('[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$','g');
  
   userForm.address.addEventListener("change", event => {
    event.preventDefault();
    let testAddress = regExAddress.test(address.value); 
    let alert = document.querySelector("#addressErrorMsg");
    if(testAddress) { 
      alert.innerHTML = "";
   } else {
    alert.innerHTML = "Adresse non valide, veuillez vous référer à l'exemple ci-dessus";
  }       
   }); 
  
   var city = document.querySelector("#city");
   var regExCity = new RegExp('^[A-Za-z\é\è\ê\-]{2,20}$','g');
   
   userForm.city.addEventListener("change", event => {
    event.preventDefault();
    let cityValue = city.value;
    let testCity = regExCity.test(cityValue); 
    let alert = document.querySelector("#cityErrorMsg");
    if(testCity) { 
      alert.innerHTML = "";
   } else {
    alert.innerHTML = "Ville non valide, le champs ne doit contenir ni chiffre ni caractère spécial";
  }       
   });  
  
  var email = document.querySelector("#email");
  var regExEmail = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
   
   userForm.email.addEventListener("change", event => {
    event.preventDefault();
   let emailValue = email.value;
   let testEmail = regExEmail.test(emailValue);
    let alert = document.querySelector("#emailErrorMsg");
    if(testEmail) { 
      alert.innerHTML = "";
   } else {
    alert.innerHTML = "Adresse mail non valide, veuillez vous référer à l'exemple contenu dans le champs";
  }       
   });
  
  //**Envoi du formulaire */
   const submitBtn = document.querySelector("#order"); 
       submitBtn.addEventListener("click", event => {
        event.preventDefault(); 
        
        let regExFirstName = new RegExp('^[A-Za-z\é\è\ê\-]{2,20}$','g');
        let regExLastName =  new RegExp('^[A-Za-z\é\è\ê\-]{2,20}$','g');
        let regExAddress = new RegExp('[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$','g');
        let regExCity = new RegExp('^[A-Za-z\é\è\ê\-]{2,20}$','g');
        let regExEmail = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
        
        let testFirstName = regExFirstName.test(firstName.value);
        let testLastName = regExLastName.test(lastName.value);
        let testAddress = regExAddress.test(address.value);
        let testCity = regExCity.test(city.value);
        let testEmail = regExEmail.test(email.value); 
        
  //Le formulaire est envoyé seulement si ses champs correspondent à leur regex respectives
        if(testFirstName &&
         testLastName && 
         testAddress && 
         testCity && 
         testEmail 
         ){
       
          //création de l'objet contac contenant les données du formulaire
        const contact = {
          firstName: firstName, 
          lastName: lastName, 
          address: address, 
          city: city, 
          email: email 
        }; 
  
        console.log(contact);
        
      //création du tableau contenant les id des articles du panier
          let productsIds = []; 
           for (let i = 0; i < cartInLs.length ; i++){
            productsIds.push(cartInLs[i].id); 
            console.log(productsIds);
           }
      
            //Création de l'objet à envoyer au back-end
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
              //Utilisation de fetch pour envoyer les données du formulaire au back-end
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
                 })}else{ 
                  //Si mauvaise saisie des champs, affichage d'un message d'erreur
                  let alertValidForm = document.querySelector("#alertValidForm"); 
                  alertValidForm.innerText = `Les données du formulaire ne sont pas valides`;
                 }
                
            
          }
       ); 
});
  
}; 
getProducts();



