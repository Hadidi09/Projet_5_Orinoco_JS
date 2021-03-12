// Variables
const dataLocalstorage = JSON.parse(localStorage.getItem("panier"));

const tBody = document.querySelector("#local");
console.log(tBody);

//Fonction de mise en page du panier
const basket = () => {
  dataLocalstorage.forEach((dataStore) => {
    // console.log(dataStore);
    const tr = document.createElement("tr");

   // const td1 = document.createElement("td");
    const tdimg = document.createElement("img");
    
    tdimg.src = `${dataStore.imageUrl}`;
    tdimg.style.width = "100px";
    const td2 = document.createElement("td");
    td2.textContent = `${dataStore.choixVarnish}`;
    const td3 = document.createElement("td");
    const btnadd = document.createElement("button");
    const btnsupp = document.createElement("button");
    //  btnadd.innerHTML += `type='button' class="btn btn-success"`
    btnadd.type = "button";
    btnsupp.type = "button";
    btnadd.className = "btn btn-success ";
    btnsupp.className = "btn btn-danger ";

    // td3.setAttribute('class', 'text-right')

    const iplus = document.createElement("i");
    const imoins = document.createElement("i");
    iplus.setAttribute("class", "fas fa-plus-square");
    imoins.setAttribute("class", "fas fa-minus-square");

    btnadd.append(iplus);
    btnsupp.append(imoins);

    // <button type="button" class="btn btn-info">Button</button>

    td3.textContent = `${(dataStore.price / 100) * dataStore.quantité} `;
    const td4 = document.createElement("td");
    td4.textContent = `${dataStore.quantité}`;

    tr.appendChild(tdimg);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td3.appendChild(btnadd);
    td3.appendChild(btnsupp);

    tr.appendChild(td4);

    console.log(tdimg);
    tBody.appendChild(tr);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  basket();
});

console.log(basket());
