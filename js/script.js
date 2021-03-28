// Variables de récupération de l'ID du produit pour la requête GET et afficher l'ID du produit au survol avec la souris sous l'écran
let params = new URLSearchParams(window.location.search)
console.log(params.get('id'))
const id = params.get('id')

//Variables
let productsRow = document.querySelector('.row')
let request = new XMLHttpRequest()

// Ma fonction qui va me permettre d'afficher le résultat de la requête sur la page
const furniture = (woodenFurniture) => {
    woodenFurniture.forEach((chattel) => {
        let col = document.createElement('div')
        let cardtext = document.createElement('div')
        let image = document.createElement('img')
        let cardbody = document.createElement('div')
        let h3 = document.createElement('h3')
        let para = document.createElement('p')
        let price = document.createElement('p')
        let link = document.createElement('a')

        col.setAttribute('class', 'col-xs-12 col-sm-12 col-md-6')
        cardtext.setAttribute('class', 'card-text-center')
        cardtext.style.width = '18rem'
        image.src = chattel.imageUrl
        image.setAttribute('class', 'card-img-top')
        cardbody.setAttribute('class', 'card-body')
        h3.textContent = chattel.name
        para.textContent = chattel.description
        price.textContent = chattel.price
        link.setAttribute('class', 'btn btn-primary')
        link.textContent = 'Acheter'
        link.setAttribute('href', 'produit.html?id=' + chattel._id)
       

        productsRow.appendChild(col)
        col.appendChild(cardtext)
        cardtext.appendChild(image)
        cardtext.appendChild(cardbody)
        cardbody.appendChild(h3)
        cardbody.appendChild(para)
        cardbody.appendChild(price)
        cardbody.appendChild(link)

        
        link.addEventListener('click', function () {
            location.href = './produit.html?id=' + id
        })
    })
}


// Fonction qui envoie la requête Get au serveur pour récupérer les meubles mis en vente
request.onreadystatechange = async () => {
    if (request.readyState == 4 && request.status == 200) {
        let response = await JSON.parse(request.response)
        console.log(response)
        furniture(response)
    }
}

request.open('GET', 'https://orinoco-js.herokuapp.com/api/furniture', true)
request.send()

