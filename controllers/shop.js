const Product = require('../models/product');
const Cart=require('../models/cart');
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows,dataField])=>{
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>console.log(err));
 
};
exports.getProduct = (req, res, next) => {
 const productId=req.params.productId;
 Product.findById(productId)
 .then(([product])=>{
      res.render('shop/product-detail',
      {product:product[0], 
        pageTitle:product.title,
        path:"/products"
      });
 }).catch(err=>{
  console.log(err)
 });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,dataField])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err=>console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products=>{
      const cartProducts=[];
      for(product of products){
        const cartProductData=cart.products.find(prod=>prod.id===product.id);
        if(cartProductData){
            cartProducts.push({productData:product,qty:cartProductData.qty});
         }

      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products:cartProducts
      });
    })
  });
 
};

exports.postCart = (req, res, next) => {
 const prodId=req.body.productId;//this is coming from hidden input from add-to-cart.ejs
Product.findById(prodId,(product)=>{
  Cart.addProduct(prodId,product.price);
});
res.redirect("/cart")
};
exports.postDeleteCartItem = (req, res, next) => {
  const prodId=req.body.productId;//this is coming from hidden input from add-to-cart.ejs
 Product.findById(prodId,(product)=>{
   Cart.deleteProduct(prodId,product.price);
   res.redirect("/cart")

 });
 };

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
