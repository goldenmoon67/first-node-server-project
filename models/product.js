const products=[];//we will change this when we acces to the database

module.exports = class Product{
    constructor(title) {
        this.title=title;
    }

    save(){
        products.push(this);
    }

   static fetchAll(){
        return products;
    }
}