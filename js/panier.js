// Variables
const furnitureStorage = JSON.parse(localStorage.getItem('panier'))
console.log(furnitureStorage)
const tBody = document.querySelector('#local')

//Fonction de mise en page du panier
const basket = () => {
    furnitureStorage.forEach((furnitureChart) => {
        // console.log(furnitureChart);
        const tr = document.createElement('tr')
        const tdimg = document.createElement('img')

        tdimg.src = `${furnitureChart.imageUrl}`
        tdimg.style.width = '100px'
        const td2 = document.createElement('td')
        td2.textContent = `${furnitureChart.choixVarnish}`
        const td3 = document.createElement('td')
        const btnAdd = document.createElement('button')
        const btnMinus = document.createElement('button')
        const btnRemove = document.createElement('button')

        btnAdd.type = 'button'
        btnMinus.type = 'button'
        btnRemove.type = 'button'
        btnAdd.className = 'btn btn-success '
        btnMinus.className = 'btn btn-secondary '
        btnRemove.className = 'btn btn-danger'

        const tag_Font_Plus = document.createElement('i')
        const tag_Font_Minus = document.createElement('i')
        const removeProduct = document.createElement('i')
        tag_Font_Plus.setAttribute('class', 'fas fa-plus-square')
        tag_Font_Minus.setAttribute('class', 'fas fa-minus-square')
        removeProduct.setAttribute('class', 'fas fa-trash-alt')

        btnAdd.append(tag_Font_Plus)
        btnMinus.append(tag_Font_Minus)
        btnRemove.append(removeProduct)

        td3.textContent = `${furnitureChart.price / 100} `
        const td4 = document.createElement('td')
        td4.textContent = `${furnitureChart.quantité}`
        const td5 = document.createElement('td')
        td5.textContent = `${
            (furnitureChart.price / 100) * furnitureChart.quantité
        } `

        tr.appendChild(tdimg)
        tr.appendChild(td2)
        tr.appendChild(td3)
        td3.appendChild(btnAdd)
        td3.appendChild(btnMinus)

        tr.appendChild(td4)
        tr.appendChild(td5)
        td5.appendChild(btnRemove)
        tBody.appendChild(tr)

        let addOneQuantity = document.querySelectorAll('.btn-success')
        addOneQuantity.forEach((add) => {
            //  console.log(add)
            add.addEventListener('click', (e) => {
                e.preventDefault()
                add_OneQty(furnitureChart)
            })
        })
        let minusOneQuantity = document.querySelectorAll('.btn-secondary')
        minusOneQuantity.forEach((supp) => {
            // console.log(supp)
            supp.addEventListener('click', (e) => {
                e.preventDefault()
                minus_OneQty(furnitureChart)
            })
        })

        let removProd = document.querySelectorAll('.btn-danger')
        removProd.forEach((remove) => {
            remove.addEventListener('click', (e, index) => {
                e.preventDefault()
                e.stopImmediatePropagation()

                removItem(furnitureChart, index)

                window.location = 'panier.html'
                console.log(furnitureChart)
            })
        })
    })
}

const add_OneQty = (prods) => {
    furnitureStorage.forEach((list) => {
        if (list.id == prods.id && list.choixVarnish == prods.choixVarnish) {
            list.quantité++
        }
        localStorage.setItem('panier', JSON.stringify(furnitureStorage))
    })
}

const minus_OneQty = (prods) => {
    furnitureStorage.forEach((list) => {
        if (list.id == prods.id && list.choixVarnish == prods.choixVarnish) {
            list.quantité--
        }
        localStorage.setItem('panier', JSON.stringify(furnitureStorage))
    })
}

///supprimer un produit
const removItem = (furnitureChart, index) => {
    let furnitureStorage = JSON.parse(localStorage.getItem('panier'))
    let removingFurniture = furnitureStorage.filter(
        (furnishings) => furnishings._id == furnitureChart
    )
    if (removingFurniture >= 0) {
        furnitureStorage.splice(index, 1)
    }

    localStorage.setItem('panier', JSON.stringify(furnitureStorage))
}

const sendingTheData = (furnitureData) => {
    let requete = new XMLHttpRequest()
    requete.onreadystatechange = async () => {
        if (requete.readyState == 4 && requete.status == 201) {
            let furnits = await JSON.parse(requete.response)
            console.log(furnits)
            localStorage.setItem('order', JSON.stringify(furnits.orderId))
            localStorage.setItem('contact', JSON.stringify(furnits.contact))
        }
    }

    requete.open('POST', 'http://localhost:3000/api/furniture/order', true)
    requete.setRequestHeader('content-type', 'application/json')

    requete.send(furnitureData)
}
// Fonction qui permet de récupérer les données saisies sur le formulaire et les ID products des meubles
const submit_Form_Data = () => {
    // Mon Objet "contact" pour récuperer les valeurs des inputs
    let contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('adresse').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value,
    }
    // Pousser les id qui se trouve dans le localstorage, dans le tableau "products"
    let products = []
    furnitureStorage.forEach((furnishings) => {
        if (furnishings) {
            products.push(furnishings._id)
        }
    })
    // Mon Objet "contact_Product_Details" pour envoyer au server les données demandées au format JSON
    const contact_Product_Details = JSON.stringify({ contact, products })

    sendingTheData(contact_Product_Details)
}

document.addEventListener('DOMContentLoaded', () => {
    basket()

    const form_Data = document.getElementById('formdata')
    form_Data.addEventListener('submit', (e) => {
        e.preventDefault()
        submit_Form_Data()

        window.location.assign('confirmation.html')
    })
})
