const orderId = JSON.parse(localStorage.getItem("order_id"));
const displayOrderId = document.querySelector("#orderId"); 

displayOrderId.innerText = orderId;

localStorage.clear();