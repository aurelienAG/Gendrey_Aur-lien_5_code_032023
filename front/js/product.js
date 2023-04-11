let url = new URLSearchParams(document.location.search); 
let id = url.get("id"); 
console.log(id);

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



// Local Storage
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

    
    function addToCart(){ 
       
        let productSelected = product();
        let alert = document.querySelector("#alert"); 
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
            alert.innerText = `Veuillez renseigner une quantité comprise entre 1 et 100 pour chaque article`
        }; }  
         
  

//bouton d'ajout au panier
let btnAdd = document.querySelector("#addToCart"); 


btnAdd.addEventListener('click', (event) =>{
    event.preventDefault();
    
addToCart();
});
}); 


