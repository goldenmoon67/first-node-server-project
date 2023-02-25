const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports=class Cart{

  static  addProduct(id,productPrice){
        //1-fetch the previuos cart
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[], totalPrice:0};
            if(err){
                console.log(err);
            }else{
              cart=  JSON.parse(fileContent);
            }

       //2-analyze the cart => find existing product
        //3- add new product/increase quantity

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
}