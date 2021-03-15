// Variables
const dataLocalstorage = JSON.parse(localStorage.getItem('panier'))
console.log(dataLocalstorage)
const tBody = document.querySelector('#local')
//console.log(tBody);

//Fonction de mise en page du panier
const basket = () => {
    dataLocalstorage.forEach((dataStore) => {
        // console.log(dataStore);
        const tr = document.createElement('tr')

        // const td1 = document.createElement("td");
        const tdimg = document.createElement('img')

        tdimg.src = `${dataStore.imageUrl}`
        tdimg.style.width = '100px'
        const td2 = document.createElement('td')
        td2.textContent = `${dataStore.choixVarnish}`
        const td3 = document.createElement('td')
        const btnadd = document.createElement('button')
        const btnsupp = document.createElement('button')
        const btnRemove = document.createElement('button')
        //  btnadd.innerHTML += `type='button' class="btn btn-success"`
        btnadd.type = 'button'
        btnsupp.type = 'button'
        btnRemove.type = 'button'
        btnadd.className = 'btn btn-success '
        btnsupp.className = 'btn btn-secondary '
        btnRemove.className = 'btn btn-danger'

        // td3.setAttribute('class', 'text-right')

        const iplus = document.createElement('i')
        const imoins = document.createElement('i')
        const removeProduct = document.createElement('i')
        iplus.setAttribute('class', 'fas fa-plus-square')
        imoins.setAttribute('class', 'fas fa-minus-square')
        removeProduct.setAttribute('class', 'fas fa-trash-alt')

        btnadd.append(iplus)
        btnsupp.append(imoins)
        btnRemove.append(removeProduct)

        // <button type="button" class="btn btn-info">Button</button>

        td3.textContent = `${dataStore.price / 100} `
        const td4 = document.createElement('td')
        td4.textContent = `${dataStore.quantité}`
        const td5 = document.createElement('td')
        td5.textContent = `${(dataStore.price / 100) * dataStore.quantité} `

        tr.appendChild(tdimg)
        tr.appendChild(td2)
        tr.appendChild(td3)
        td3.appendChild(btnadd)
        td3.appendChild(btnsupp)

        tr.appendChild(td4)
        tr.appendChild(td5)
        td5.appendChild(btnRemove)
        // console.log(tdimg);
        tBody.appendChild(tr)

        //let clases = new Product(dataStore.choixVarnish, dataStore.id, dataStore.imageUrl, dataStore.name, dataStore.price, dataStore.quantité)

        //console.log(clases);
        let addnew = document.querySelectorAll('.btn-success')
        addnew.forEach((add) => {
            console.log(add)
            add.addEventListener('click', (e) => {
                e.preventDefault()
                dataLocalstorage.forEach((list) => {
                    if (
                        list.id == dataStore.id &&
                        list.choixVarnish == dataStore.choixVarnish
                    ) {
                        list.quantité++
                    } else if (list.quantité === 0) {
                        list.id.remove()
                    }
                    localStorage.setItem(
                        'panier',
                        JSON.stringify(dataLocalstorage)
                    )
                })
            })
        })
        let suppnew = document.querySelectorAll('.btn-secondary')
        suppnew.forEach((supp) => {
            console.log(supp)
            supp.addEventListener('click', (e) => {
                e.preventDefault()
                dataLocalstorage.forEach((list) => {
                    if (
                        list.id == dataStore.id &&
                        list.choixVarnish == dataStore.choixVarnish
                    ) {
                        list.quantité--
                    }
                    localStorage.setItem(
                        'panier',
                        JSON.stringify(dataLocalstorage)
                    )
                })
            })
        })

        let removProd = document.querySelectorAll('.btn-danger')
        removProd.forEach((remove) => {
            remove.addEventListener('click', (e) => {
                e.preventDefault()

                dataLocalstorage.forEach((list) => {
                    if (
                        list.id === dataStore.id &&
                        list.choixVarnish == dataStore.choixVarnish
                    ) {
                        let index = list.id
                        dataLocalstorage.splice(index, 1)
                    }
                    localStorage.setItem(
                        'panier',
                        JSON.stringify(dataLocalstorage)
                    )
                })
            })
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    basket()

    let submit = document.querySelector('#submit')
    submit.addEventListener('click', (e) => {
        e.preventDefault()
        envoiDonnees()
        window.location = 'confirmation.html'
    })
})

let Contact = {
    firstName: document.querySelector('#firstname').value,
    lastName: document.querySelector('#lastName').value,
    adresse: document.querySelector('#adresse').value,
    city: document.querySelector('#city').value,
    email: document.querySelector('#email').value,
}

let products = []
dataLocalstorage.forEach((data) => {
    if (data) {
        products.push(data.id)
    }
})

const envoiDonnees = () => {
    let requete = new XMLHttpRequest()
    requete.open('POST', 'http://localhost:3000/api/furniture/order')
    requete.setRequestHeader('content-type', 'application/json')
    requete.send(JSON.stringify(Contact, products))
}
