class Product {
  constructor(imageUrl, name, description, price, _id, varnish, quantité = 1) {
    this.imageUrl = imageUrl;
    this.name = name;
    this.description = description;
    this.price = price;
    this._id = _id;
    this.varnish = varnish;
    this.quantité = quantité;
  }

  oneSelection = () => {
    let select = document.querySelector("select");
    this.varnish = select.options[select.selectedIndex].value;
  }

  oneProduct = () => {
    let tab = [];
    let store = {
      _id: this._id,
      imageUrl: this.imageUrl,
      name: this.name,
      price: this.price,
      quantité: 1,
      choixVarnish: this.varnish,
    };

    tab.push(store);

    localStorage.setItem("meubles", JSON.stringify(tab));

    let mobilier = JSON.parse(localStorage.getItem("meubles"));

    mobilier.forEach((list) => {
      if (this._id === list._id && this.varnish === list.varnish) {
        list.quantité++;
      }
    });

    alert("well done");
  };

  doublon = () => {
    let mobilier = JSON.parse(localStorage.getItem("meubles"));

    mobilier.forEach((list) => {
      if (this._id === list._id && this.varnish === list.varnish) {
        list.quantité++;
      }
    });
  };
}
