const params = new URLSearchParams(window.location.search);
console.log(params.get("id"));
const id = params.get('id');

let produits = document.querySelector('.row')

let requete = new XMLHttpRequest();

requete.onreadystatechange = () => {
    if(requete.readyState == 4 && requete.status == 200){
        let response = JSON.parse(requete.response)
        console.log(response);
       response = mobilier(response)
    }
}

requete.open('GET', "http://localhost:3000/api/furniture/" + id, true)
requete.send()

const mobilier = (meubles) => {
    
  let col = document.createElement('div')
  let cardtext = document.createElement('div')
  let image = document.createElement('img')
  let cardbody = document.createElement('div')
  let h3 = document.createElement('h3')
  let para = document.createElement('p')
  let price = document.createElement('p')
  let lien = document.createElement('a')


        col.setAttribute("class", "col-xs-12 col-sm-6 col-md-4")
        cardtext.setAttribute("class", "card-text-center")
        cardtext.style.width = "18rem"
        image.src = meubles.imageUrl
        image.setAttribute("class", "card-img-top")
        cardbody.setAttribute("class", "card-body")
        h3.textContent = meubles.name
        para.textContent = meubles.description
        price.textContent = meubles.price/100
        lien.setAttribute("class", "btn btn-primary ajout")
        lien.textContent = "Acheter"
        lien. setAttribute("href", "produit.html?id=" + id)
        //location.href = "produits.html?id=" + furniture[i]._id;
        
        produits.appendChild(col)
        col.appendChild(cardtext)
        cardtext.appendChild(image)
        cardtext.appendChild(cardbody)
        cardbody.appendChild(h3)
        cardbody.appendChild(para)
        cardbody.appendChild(price)
        cardbody.appendChild(lien)
        selection = document.createElement('select')
        meubles.varnish.forEach(choix => {
            let option = document.createElement('option')
            option.value = choix;
            option.text = choix;
            selection.appendChild(option)
            cardbody.appendChild(selection)
        })
        
         const prod = new Product2(meubles._id,meubles.imageUrl, meubles.price, meubles.quantité, meubles.varnish)
         console.log(prod);

       
        let ajouter = document.querySelectorAll('.ajout')
        let produit = []
         

          console.log(prod);
        
     // écouter l'événement au click, pour stocker les produits dans le localStorage
    ajouter.forEach(ajout => {
      ajout.addEventListener('click', (e) => {
       e.preventDefault()
       //meuble est mon objet qui va me permettre de stocker les données du meuble choisi dans le localstorage
        let meuble = { 
          "id" : meubles._id,
          "imageUrl": meubles.imageUrl,
          "name": meubles.name,
          "price": meubles.price,
          "quantité": 1,
          "choixVarnish": meubles.varnish
          
        }
        //Gérer le choix de varnish unique 
        let select = document.querySelector('select');
        meuble.choixVarnish = select.options[select.selectedIndex].value

        // Si le localStorage est strictement égal à null . Pousse l'objet meuble dans le tableau produit
        if(localStorage.getItem('panier') === null)
            {
              produit.push(meuble)
              localStorage.setItem('panier', JSON.stringify(produit))  
            }
         // Sinon récupère la clé 'panier'
        else if (localStorage.getItem('panier')){
            // le parser avec la méthode JSON.parse()    
          panier = JSON.parse(localStorage.getItem('panier'))
          // Ensuite fait une boucle en utilisant la méthode ForEach avec le tableau panier
          panier.forEach(meubleInStore => {
            // Déclaration de la variable choix pour filtrer et pouvoir gérer l'ajout de quantité , des choixVarnish et de nouveau produit
            let choix = panier.find(choix => choix.id === meuble.id && choix.choixVarnish === meuble.choixVarnish)
              if (meubleInStore.id === meuble.id) {
            
                if(choix){
                  meubleInStore.quantité += 1
                } 
                
                else{
                  panier.push(meuble)
                }

              }
              else if(!choix){
                panier.push(meuble)
              }

          })
          
          localStorage.setItem('panier', JSON.stringify(panier))
            
          
        }

       
        alert('well done')
      })
            
    })
    
}


