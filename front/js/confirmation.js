const orderId = JSON.parse(localStorage.getItem("order_id"));

const displayOrderId = document.querySelector("#orderId"); 
console.log(displayOrderId); 

displayOrderId.innerText = orderId;