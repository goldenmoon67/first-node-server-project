const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

module.exports=class Cart{

    addProduct(id,price){
        //1-fetch the previuos cart
        //2-analyze the cart => find existing product
        //3- add new product/increase quantity
    }
}