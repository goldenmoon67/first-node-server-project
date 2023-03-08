
const Cart=require('../models/cart');
const db=require('../util/database');



module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id; //I added this one because I will check it to update mode. If it is null I will go to add-product else I will go to update
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   
  }

  static deleteProduct(id) {
  
  }

  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }

  static findById(id,cb){
 
  }
};
