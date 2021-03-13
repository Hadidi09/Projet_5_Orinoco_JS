//Variables de récupération de l'ID du produit pour la requête GET
let params = new URLSearchParams(window.location.search)
console.log(params.get('id'))
const id = params.get('id')

//Variables
let produits = document.querySelector('.row')
let requete = new XMLHttpRequest()

// Ma fonction qui va me permettre d'afficher le resultat de la requête sur la page
const furniture = (woodenFurniture) => {
    woodenFurniture.forEach((chattel) => {
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
        image.src = chattel.imageUrl
        image.setAttribute('class', 'card-img-top')
        cardbody.setAttribute('class', 'card-body')
        h3.textContent = chattel.name
        para.textContent = chattel.description
        price.textContent = chattel.price
        lien.setAttribute('class', 'btn btn-primary')
        lien.textContent = 'Acheter'
        lien.setAttribute('href', './produit.html?id=' + chattel._id)
        //location.href = "produits.html?id=" + furniture[i]._id;

        produits.appendChild(col)
        col.appendChild(cardtext)
        cardtext.appendChild(image)
        cardtext.appendChild(cardbody)
        cardbody.appendChild(h3)
        cardbody.appendChild(para)
        cardbody.appendChild(price)
        cardbody.appendChild(lien)

        //  const prod = new Product(chattel.imageUrl,meubles.name, meubles.description,meubles.price,meubles._id)
        //  console.log(prod);

        lien.addEventListener('click', function () {
            location.href = './produit.html?id=' + id
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

requete.open('GET', 'http://localhost:3000/api/furniture', true)
requete.send()
