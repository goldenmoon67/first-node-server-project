const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);
const getCartFromFile=cb=>{
  fs.readFile(p,(err,fileContent)=>{
    let cart={products:[], totalPrice:0};
    if(err){
        cb(cart);
    }else{
     cb(JSON.parse(fileContent));
    }

  });
};
module.exports=class Cart{

  static  addProduct(id,productPrice){
        getCartFromFile(cart=>{

          const existingProductIndex=cart.products.findIndex(p=>p.id===id);
          const existingProduct=cart.products[existingProductIndex];
          let updatedProduct;
          if(existingProduct){
              updatedProduct={...existingProduct};//we get all features for updated product from  existing product
              updatedProduct.qty=updatedProduct.qty+1;//we incremant quantity for this product
              cart.products=[...cart.products];
              cart.products[existingProductIndex]=updatedProduct;// we update existing product because we incremen its quantitiy. we should see it

          }else{
              updatedProduct={id:id, qty:1};
              cart.products=[...cart.products,updatedProduct];//add to cart
          }

        cart.totalPrice=cart.totalPrice+  +productPrice;//inc total price

        fs.writeFile(p,JSON.stringify(cart),err=>{
          console.log(err);
        });
        });
       

    }

  static deleteProduct(id,productPrice){

    getCartFromFile(cart=>{
      const updatedCart ={...cart};
      const product=updatedCart.products.find(prod=>prod.id===id);
      const productQuantity=product.qty;
      const totalPrice=cart.totalPrice;
       updatedCart.totalPrice=totalPrice- -productPrice*productQuantity;
      updatedCart.products= updatedCart.products.filter(prod=>prod.id!==id);

    fs.writeFile(p,JSON.stringify(updatedCart),err=>{
         console.log(err);
       });
    });
  }

  static getCart(cb) {
    getCartFromFile(cb);
  }
}