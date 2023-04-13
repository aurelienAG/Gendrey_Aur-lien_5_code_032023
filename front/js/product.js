//Utilisation d'URLSearchParams pour manipuler les paramètres de l'url courante
let url = new URLSearchParams(document.location.search);
// On récupère le paramètre correspondant à l'id du produit à afficher   
let id = url.get("id"); 
console.log(id);

// Appel à l'API en spécifiant l'id du produit qui nous intéresse
const getProduct = fetch(`http://localhost:3000/api/products/${id}`); 
getProduct
.then(async response =>{

 const currentProduct = await response.json(); 
 const displayTitle = document.querySelector("#pageTitle"); 
 const displayName = document.querySelector("#title"); 
 const displayImage = document.querySelector(".item__img");
 const displayPrice = document.querySelector("#price");  
 const displayDescription = document.querySelector("#description"); 
 displayTitle.innerText = currentProduct.name;
 displayName.innerText = currentProduct.name;
 displayImage.innerHTML = `<img src = "${currentProduct.imageUrl}"></img>`;
 displayPrice.innerText = currentProduct.price; 
 displayDescription.innerText = currentProduct.description;
 
 //Affichage des options de personnalisation 

 const selectOption = document.querySelector("#colors");
 let optionArray = currentProduct.colors; 
 console.log(optionArray);

const displayOption = () => {
    const optionsNode = optionArray.map(color => {
        return createOptionElement(color);
       
    }); 
    selectOption.innerHTML = ""; 
    selectOption.append(...optionsNode);
    console.log(optionsNode);
    console.log(...optionsNode);
};


const createOptionElement = color => {
    const option = document.createElement("option"); 
    option.innerHTML = color; 
    return option; 
}; 

displayOption();


//Fonction contenant les données du produits sélectionné
function product(){
    let quantity = parseInt(document.querySelector("#quantity").value); 
    
    let item = {
        id: currentProduct._id,
        image: currentProduct.imageUrl, 
        name: currentProduct.name,
        option: selectOption.value,
        quantity: quantity
    }; 
    return item
    
    };
    
    //Fonction qui sauvegarde les articles du panier dans le local storage 
    function saveLocalStorage(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    };
    
    //Fonction qui indique l'état du panier
    function getCart(){
     let cart = localStorage.getItem("cart"); 
     //Si le local storage est vide, le panier est un tableau vide
     if (cart === null){
        return [];
     }
     //Si le local storage comporte au moins un article, le panier est un tableau d'objet
     else { 
       return JSON.parse(cart);
     }
    };  
  
 //Fonction qui ajoute les produits au panier   
    function addToCart(){ 
        let productSelected = product();
        let alert = document.querySelector("#alert"); 
        //On ajoute le produit au panier seulement si la quantité est supérieure à 0 et inférieure ou égale à 100
        if(quantity.value > 0 && quantity.value <= 100){
         let cart = getCart(); 
         alert.innerText = `Votre produit a bien été ajouté au panier !`;
         let foundedConditions = cart
         .find(el => el.name === productSelected.name && el.option === productSelected.option);
         foundedConditions != undefined ? 
         foundedConditions.quantity = foundedConditions.quantity + productSelected.quantity 
         : cart.push(productSelected);       
         saveLocalStorage(cart)
        }else { 
            alert.innerHTML = `Votre produit n'a pas été ajouté au panier :( </br>La quantité doit avoir une valeur minimale de 1 ou une valeur maximale de 100`
        }; 
    }  

//Gestion du bouton d'ajout au panier
let btnAdd = document.querySelector("#addToCart"); 

btnAdd.addEventListener('click', (event) =>{
    event.preventDefault();
//Lorsqu'on clique sur le bouton la fonction d'ajout au panier est invoquée
addToCart();
});
}); 


