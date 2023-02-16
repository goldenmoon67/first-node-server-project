
const Product = require("../models/product.js");
exports.getProducts= (req,res,next)=>{
    const products=Product.fetchAll((products)=>{//we get the products with this callback func
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
          });
    });
   
}

exports.getAddProducts=(req,res,next)=>{
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });//handlebars takes if else like that
}

exports.postAddProducts=(req,res,next)=>{
    const product=new Product(req.body.title);
    product.save();
    res.redirect("/");
}