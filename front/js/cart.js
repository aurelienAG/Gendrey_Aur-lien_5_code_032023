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
