let produits = document.querySelector('.row')

let requete = new XMLHttpRequest();

requete.onreadystatechange = () => {
    if(requete.readyState == 4 && requete.status == 200){
        let response = JSON.parse(requete.responseText)
        console.log(response);
        mobilier(response)
    }
}

requete.open('GET', "http://localhost:3000/api/furniture")
requete.send()

const mobilier = (furniture) => {
    furniture.forEach(meubles => {
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
        price.textContent = meubles.price
        lien.setAttribute("class", "btn btn-primary")
        lien.textContent = "Acheter"
        lien.href = meubles._id
        //location.href = "produits.html?id=" + furniture[i]._id;
        
        produits.appendChild(col)
        col.appendChild(cardtext)
        cardtext.appendChild(image)
        cardtext.appendChild(cardbody)
        cardbody.appendChild(h3)
        cardbody.appendChild(para)
        cardbody.appendChild(price)
        cardbody.appendChild(lien)
        
        const prod = new Product(meubles.imageUrl,meubles.name, meubles.description,meubles.price,meubles._id)
        console.log(prod);
    })
}