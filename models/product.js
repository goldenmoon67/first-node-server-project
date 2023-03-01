const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id; //I added this one because I will check it to update mode. If it is null I will go to add-product else I will go to update
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if(this.id){
        const existingProductIndex=products.findIndex(prod=>prod.id===this.id);
        const updatedProducts=[...products];
        updatedProducts[existingProductIndex]=this;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }else{
        this.id=Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    
    });
  }

  static deleteProduct(id) {
    getProductsFromFile(products => {
       const updatedProducts=products.filter(prod=>prod.id!==id)
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
          console.log("hata");

        });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
    getProductsFromFile(products=>{
      const product=products.find(p=>p.id===id);
      cb(product);
    })
  }
};
