const getItems = fetch('http://localhost:3000/api/products'); 

const cardContainer = document.querySelector(".items"); 
console.log(cardContainer); 

getItems
  .then(async response => {
    console.log(response);
    
    const items = await response.json(); 
    console.log(items);
    const mapping = 
    
    items.map (item => item = `
    
          <a href="product.html?+=${item._id}">
            <article>
               <img src="${item.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1"/>
          <h3>${item.name}</h3>
               <p class="productDescription">${item.description}</p>
            </article>
          </a>
      `
    )
    .join("");
   cardContainer.innerHTML = mapping;
})

.catch(err => console.log(err)); 

if (err){
    cardContainer.innerHTML = `<h3> Pb de serveur :( </h3>`;
}; 
