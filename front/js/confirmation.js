//récupération de l'orderId pour pouvoir le manipuler
const orderId = JSON.parse(localStorage.getItem("order_id"));
const displayOrderId = document.querySelector("#orderId"); 

//Affichage de l'orderId
displayOrderId.innerText = orderId;

//On ne stocke pas l'orderId dans le local storage
localStorage.clear();