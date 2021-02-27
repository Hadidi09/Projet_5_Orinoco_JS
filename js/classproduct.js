class Product {
    constructor(imageUrl, name, description, price, _id){
        this.imageUrl = imageUrl;
        this.name = name;
        this.description = description;
        this.price = price;
        this._id = _id;
    }

    oneProduct = (furniture) => {
      console.log(this._id)
    }
}