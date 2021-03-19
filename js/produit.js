//Variables de récupération de l'ID du produit pour la requête GET
let params = new URLSearchParams(window.location.search)
console.log(params.get('id'))
const id = params.get('id')

//Mes Variables
let produits = document.querySelector('.row')
let requete = new XMLHttpRequest()

const furniture = (woodenFurniture) => {
    let col = document.createElement('div')
    let cardtext = document.createElement('div')
    let image = document.createElement('img')
    let cardbody = document.createElement('div')
    let h3 = document.createElement('h3')
    let para = document.createElement('p')
    let price = document.createElement('p')
    let lien = document.createElement('a')

    col.setAttribute('class', 'col-xs-12 col-sm-6 col-md-4')
    cardtext.setAttribute('class', 'card-text-center')
    cardtext.style.width = '18rem'
    image.src = woodenFurniture.imageUrl
    image.setAttribute('class', 'card-img-top')
    cardbody.setAttribute('class', 'card-body')
    h3.textContent = woodenFurniture.name
    para.textContent = woodenFurniture.description
    price.textContent = woodenFurniture.price / 100
    lien.setAttribute('class', 'btn btn-primary ajout')
    lien.textContent = 'Acheter'
    lien.setAttribute('href', 'produit.html?id=' + id)

    produits.appendChild(col)
    col.appendChild(cardtext)
    cardtext.appendChild(image)
    cardtext.appendChild(cardbody)
    cardbody.appendChild(h3)
    cardbody.appendChild(para)
    cardbody.appendChild(price)
    cardbody.appendChild(lien)
    let selection = document.createElement('select')
    woodenFurniture.varnish.forEach((choix) => {
        let option = document.createElement('option')
        option.value = choix
        option.text = choix
        selection.appendChild(option)
        cardbody.appendChild(selection)
    })

    let ajouter = document.querySelectorAll('.ajout')
    let produit = []

    // écouter l'événement au click, pour stocker les produits dans le localStorage
    ajouter.forEach((ajout) => {
        ajout.addEventListener('click', (e) => {
            e.preventDefault()
            //meuble est mon objet qui va me permettre de stocker les données du meuble choisi dans le localstorage
            let meuble = {
                _id: woodenFurniture._id,
                imageUrl: woodenFurniture.imageUrl,
                name: woodenFurniture.name,
                price: woodenFurniture.price,
                quantité: 1,
                choixVarnish: woodenFurniture.varnish,
            }
            //Gérer le choix de varnish unique
            let select = document.querySelector('select')
            meuble.choixVarnish = select.options[select.selectedIndex].value

            // Si le localStorage est strictement égal à null . Pousse l'objet meuble dans le tableau produit
            if (localStorage.getItem('panier') === null) {
                produit.push(meuble)
                localStorage.setItem('panier', JSON.stringify(produit))
            }
            // Sinon récupère la clé 'panier'
            else if (localStorage.getItem('panier')) {
                // le parser avec la méthode JSON.parse()
                let panier = JSON.parse(localStorage.getItem('panier'))
                // Ensuite fait une boucle en utilisant la méthode ForEach avec le tableau panier
                panier.forEach((meubleInStore) => {
                    // Déclaration de la variable choix pour filtrer et pouvoir gérer l'ajout de quantité , des choixVarnish et de nouveau produit
                    let choix = panier.find(
                        (choix) =>
                            choix._id === meuble._id &&
                            choix.choixVarnish === meuble.choixVarnish
                    )
                    if (meubleInStore._id === meuble._id) {
                        if (choix) {
                            meubleInStore.quantité += 1
                        } else {
                            panier.push(meuble)
                        }
                    } else if (!choix) {
                        panier.push(meuble)
                    }
                })

                localStorage.setItem('panier', JSON.stringify(panier))
            }

            alert('well done')
        })
    })
}

requete.onreadystatechange = () => {
    if (requete.readyState == 4 && requete.status == 200) {
        let response = JSON.parse(requete.response)
        console.log(response)
        furniture(response)
    }
}

requete.open('GET', 'http://localhost:3000/api/furniture/' + id, true)
requete.send()
