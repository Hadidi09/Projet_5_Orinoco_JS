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

        //  let select = document.querySelector('select');
        //  prod[meubles.varnish] = select.options[select.selectedIndex].value
        //  console.log( prod[meubles.varnish]);
        let ajouter = document.querySelectorAll('.ajout')
//         //  const prod2 = prod.oneSelection()
//         //  console.log(prod2)
          let panier = []
          let produit = prod
          panier.push(produit) 
          let verif = true

          console.log(prod);
        
          
         

                  // if(localStorage.getItem('meubles')){
                  //     console.log('this is how we do');
                  // }
                  // else{
                  //     // let panier = []
                  //     localStorage.setItem('meubles', JSON.stringify(panier))
                  // }
                 // console.log(localStorage.getItem('meubles'));
                  ajouter.forEach(ajout => {
                    ajout.addEventListener('click', (e) => {
                      e.preventDefault()
                      produit.oneSolution()
                      // panier = JSON.parse(localStorage.getItem('meubles'))
                      if(localStorage.getItem('meubles') != undefined){
                        
                       
                        panier[produit.addqty()]
                           
                          
                            console.log(panier);
                             localStorage.setItem('meubles', JSON.stringify(panier))
                             console.log(panier);
                           }

                            else{
                              panier = JSON.parse(localStorage.getItem('meubles'))
                              console.log(panier);

             

                             

                          


                            localStorage.setItem('meubles', JSON.stringify(panier))
                             
                            }
                                
                         
                         
                            // table.push(produit)
                           
                          
                            
                               
                               
                               
  
                
                          

                         
                         
                          localStorage.setItem('meubles', JSON.stringify(panier))
                    
                           
                         
                      
                     
                        alert('well done')
                    })
                    
                  })
       
//         localStorage.setItem('meubles', JSON.stringify(panier))
//        ajouter.forEach(ajout => {
//                 ajout.addEventListener('click', (e) => {
//                     e.preventDefault()
//                     prod.oneSelection
                
//                   if(localStorage.getItem('meubles') != null){
//                      prod.oneProduct()

//                   }else {
//                     let mobilier = JSON.parse(localStorage.getItem('meubles'))

//                     mobilier.forEach(list => {
//                      if (meubles._id === list._id && meubles.varnish === list.varnish ) {
//                        list.quantité++;
//                      }
//                     })

//                   }

//                 //    let panel = JSON.parse(localStorage.getItem('meubles'))

//                 //    panel = (prod.oneProduct())

//                 //    console.log(panel);
                   
                   
        
//             })
//         })
    }

  
