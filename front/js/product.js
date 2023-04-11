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
 displayTitle.innerHTML = currentProduct.name;
 displayName.innerHTML = currentProduct.name;
 displayImage.innerHTML = `<img src = "${currentProduct.imageUrl}"></img>`;
 displayPrice.innerHTML = currentProduct.price; 
 displayDescription.innerHTML = currentProduct.description;
 
 //Affichage des options de personnalisation 
 const selectOption = document.querySelector("#colors");
 let optionArray = currentProduct.colors; 

const displayOption = () => {
    const optionsNode = optionArray.map(color => {
        return createOptionElement(color);
        
    }); 
    selectOption.innerHTML = ""; 
    selectOption.append(...optionsNode);
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
        quantity: quantity,
        unitPrice: currentProduct.price
    }; 
    return item
    
    };
    
    //Fonction qui sauvegarde les articles du panier dans le local storage 
    function saveLocalStorage(cart){
        localStorage.setItem("cart", JSON.stringify(cart));
    };
    
    
    function getCart(){
     let cart = localStorage.getItem("cart"); 
     if (cart === null){
        return [];
     }else {
       return JSON.parse(cart);
     }
    };  

 //Fonction qui ajoute les produits au panier   
    function addToCart(){ 
        let productSelected = product();
        let alert = document.querySelector("#alert"); 
        //On ajoute le produit au panier seulement si la quantité est valide
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
            alert.innerText = `Votre produit n'a pas été ajouté au panier :( La valeur de la quantité doit être au minimum de 1 et au maximum de 100`
        }; }  
         
  

//Gestion du bouton d'ajout au panier
let btnAdd = document.querySelector("#addToCart"); 

btnAdd.addEventListener('click', (event) =>{
    event.preventDefault();

//On invoque la fonction d'ajout au panier au clic du bouton
addToCart();
});
}); 


