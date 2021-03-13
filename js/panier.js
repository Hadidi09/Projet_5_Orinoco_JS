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
        //  btnadd.innerHTML += `type='button' class="btn btn-success"`
        btnadd.type = 'button'
        btnsupp.type = 'button'
        btnadd.className = 'btn btn-success '
        btnsupp.className = 'btn btn-danger '

        // td3.setAttribute('class', 'text-right')

        const iplus = document.createElement('i')
        const imoins = document.createElement('i')
        iplus.setAttribute('class', 'fas fa-plus-square')
        imoins.setAttribute('class', 'fas fa-minus-square')

        btnadd.append(iplus)
        btnsupp.append(imoins)

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
        // console.log(tdimg);
        tBody.appendChild(tr)

        //let clases = new Product(dataStore.choixVarnish, dataStore.id, dataStore.imageUrl, dataStore.name, dataStore.price, dataStore.quantité)

        //console.log(clases);
        let addnew = document.querySelectorAll('.btn-success')
        console.log(addnew)

        addnew.forEach((add) => {
            add.addEventListener('click', (e) => {
                e.preventDefault()
                e.stopPropagation()
                let tab = []
                tab.push(dataLocalstorage)
                tab.map((tables) => {
                    if (
                        tables.id === dataStore.id &&
                        tables.choixVarnish === dataStore.choixVarnish
                    ) {
                        localStorage.setItem('panier', JSON.stringify(tables))
                    }
                    console.log(tables)
                })

                //console.log(add);

                //  localStorage.setItem('panier', JSON.stringify(clases))
                // console.log(localStorage.setItem('panier', JSON.stringify(dise)));
            })
        })
    })
}

document.addEventListener('DOMContentLoaded', () => {
    basket()
})

// const addBasket = (product) =>
// {
//   product.forEach(prod =>
//   {
//     let site = prod.find(sites => sites.quantité == prod.quantité)
//     if (site)
//     {
//       product.quantité++
//     }
//     localStorage.setItem('panier', JSON.stringify(product))
//   })

//   localStorage.setItem('panier', JSON.stringify(product))
//   //console.log(quantity);
// }

// let suc = addBasket()

// console.log(suc);

// const addBasket = () =>
// {
//   let panier = JSON.parse(localStorage.getItem('panier'))

//   let trouver = panier.findIndexOf()

//   panier.forEach(addItem =>
//   {
//     if (addItem.id === panier.id) {

//           addItem.quantité += 1
//       }
//   localStorage.setItem('panier', JSON.stringify(addItem))
//   })

// }
