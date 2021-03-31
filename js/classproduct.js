class Product {
    constructor(choixVarnish, id, imageUrl, name, price, quantité = 1) {
        this.imageUrl = imageUrl
        this.name = name
        this.price = price
        this._id = id
        this.choixVarnish = choixVarnish
        this.quantité = quantité
    }

    addQuantity() {
        if (this.id === this.id && this.choixVarnish === this.choixVarnish) {
            this.quantité++
            console.log(this)
        }
    }
}
