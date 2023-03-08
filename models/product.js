
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
   return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',[this.title,this.price,this.description,this.imageUrl]);
  }

  static deleteProduct(id) { res.render('shop/product-list', {
    prods: products,
    pageTitle: 'All Products',
    path: '/products'
  });
  
  }

  static fetchAll() {
   return db.execute('SELECT * FROM products');
  }

  static findById(id){
    return db.execute('SELECT * FROM products WHERE products.id=?',[id]);
  }
};
