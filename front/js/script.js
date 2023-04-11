//*** Utilisation de la méthode fetch pour récupérer l'ensemble des articles de l'API ***/
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
         
          <a href="product.html?id=${item._id}">
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

//*** Si le serveur n'est pas lancé, on informe l'utilisateur ***/
.catch( cardContainer.innerHTML = `<h1> Serveur hors service :( </h1>
<h2>Nous vous prions de réessayer ultérieurement</h2>`); 


