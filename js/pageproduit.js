class Product2 {
    constructor(_id, imageUrl, price, quantité = 0, varnish){
        this._id = _id;
        this.imageUrl = imageUrl;
        this.price = price;
        this.quantité = quantité;
        this.varnish = varnish;
     
        
        
    }

    addqty = () => {
        if(this._id === this._id && this.varnish === this.varnish)
        this.quantité++
    }
    oneSolution = () =>{
        let select = document.querySelector('select');
        this.varnish = select.options[select.selectedIndex].value
       
      }

      addSameProd = () => {
        
        if(this._id === this._id && this.varnish === this.varnish){
            this.quantité++
            
           
        }
       
       
      }

      addprod = () => {}

}
