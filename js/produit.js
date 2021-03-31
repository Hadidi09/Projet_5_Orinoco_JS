// Variables de récupération de l'ID du produit pour la requête GET
let params = new URLSearchParams(window.location.search)
console.log(params.get('id'))
const id = params.get('id')

//Mes Variables
let products = document.querySelector('.row')
let request = new XMLHttpRequest()
let furnitureProducts = []

//
const furniture = (woodenFurniture) => {
    let col = document.createElement('div')
    let cardtext = document.createElement('div')
    let image = document.createElement('img')
    let cardbody = document.createElement('div')
    let h3 = document.createElement('h2')
    let para = document.createElement('p')
    let price = document.createElement('span')
    let link = document.createElement('a')

    col.setAttribute('class', 'col-xs-12 col-sm-12 col-md-6')
    cardtext.setAttribute('class', 'card-text-center')
    cardtext.style.width = '18rem'
    image.src = woodenFurniture.imageUrl
    image.setAttribute('class', 'card-img-top')
    cardbody.setAttribute('class', 'card-body')
    h3.textContent = woodenFurniture.name
    para.textContent = woodenFurniture.description
    para.setAttribute('class', 'description')
    price.textContent = woodenFurniture.price / 100
    link.setAttribute('class', 'btn btn-primary ajout')
    link.textContent = 'Acheter'
    link.setAttribute('href', '../frontend/pagesHTML/produit.html?id=' + id)

    products.appendChild(col)
    col.appendChild(cardtext)
    cardtext.appendChild(image)
    cardtext.appendChild(cardbody)
    cardbody.appendChild(h3)
    cardbody.appendChild(para)
    cardbody.appendChild(price)
    cardbody.appendChild(link)
    let selection = document.createElement('select')
    woodenFurniture.varnish.forEach((optionTochoose) => {
        let option = document.createElement('option')
        option.value = optionTochoose
        option.text = optionTochoose
        selection.appendChild(option)
        cardbody.appendChild(selection)
    })

    let addToShoppingCart = document.querySelectorAll('.ajout')

    // écouter l'événement au click, pour stocker les produits dans le localStorage
    addToShoppingCart.forEach((addFurniture) => {
        addFurniture.addEventListener('click', (e) => {
            e.preventDefault()
            //meuble est mon objet qui va me permettre de stocker les données du meuble choisi dans le localstorage
            let featureFurniture = {
                _id: woodenFurniture._id,
                imageUrl: woodenFurniture.imageUrl,
                name: woodenFurniture.name,
                price: woodenFurniture.price,
                quantité: 1,
                choiceToAddVarnish: woodenFurniture.varnish,
            }
            //Gérer le choix de varnish unique
            let select = document.querySelector('select')
            featureFurniture.choiceToAddVarnish =
                select.options[select.selectedIndex].value

            // Si le localStorage est strictement égal à null . Pousse l'objet meuble dans le tableau produit
            if (localStorage.getItem('panier') === null) {
                furnitureProducts.push(featureFurniture)
                localStorage.setItem(
                    'panier',
                    JSON.stringify(furnitureProducts)
                )
            }

            // Sinon récupère la clé 'panier'
            else if (localStorage.getItem('panier')) {
                // le parser avec la méthode JSON.parse()
                let panier = JSON.parse(localStorage.getItem('panier'))
                // Ensuite fait une boucle en utilisant la méthode ForEach avec le tableau panier
                panier.forEach((furnitureInStore) => {
                    // Déclaration de la variable choix pour filtrer et pouvoir gérer l'ajout de quantité , des choixVarnish et de nouveau produit
                    let choiceToAdd = panier.find(
                        (addChoice) =>
                            addChoice._id === featureFurniture._id &&
                            addChoice.choiceToAddVarnish ===
                                featureFurniture.choiceToAddVarnish
                    )
                    if (furnitureInStore._id === featureFurniture._id) {
                        if (choiceToAdd) {
                            furnitureInStore.quantité++
                        } else {
                            panier.push(featureFurniture)
                        }
                    } else if (!choiceToAdd) {
                        panier.push(featureFurniture)
                    }
                })

                localStorage.setItem('panier', JSON.stringify(panier))
            }

            alert(`Votre ${woodenFurniture.name} a été ajouté`)
        })
    })
}

// Fonction qui envoie la requête Get ID au serveur pour récupérer uniquement le meuble choisi grâce à son ID
request.onreadystatechange = async () => {
    if (request.readyState == 4 && request.status == 200) {
        let response = await JSON.parse(request.response)
        // console.log(response)
        furniture(response)
    }
}

request.open('GET', 'http://localhost:3000/api/furniture/' + id, true)
request.send()
