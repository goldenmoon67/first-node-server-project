const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {//I will use same page for add and edit prduct
    pageTitle: 'Add Product',
    path: '/admin/add-product'
  });
};

exports.getEditProduct = (req, res, next) => {
  res.render('admin/edit-product'/*need id*/, {//I will use same page for add and edit prduct
    pageTitle: 'Edit Product',  
    path: '/admin/edit-product'
    //I need product model
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
