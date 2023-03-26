
const Product=require("../models/product");
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {//I will use same page for add and edit prduct
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;//we will use this to do something like that -> miracaltinay/edit/123456?edit=true
  if(!editMode){
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  Product.findById(prodId,(product)=>{
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',  
      path: '/admin/edit-product',
      editing:editMode,
      product:product,
    });
  });
  
};
exports.postEditProduct = (req, res, next) => {
 const prodId=req.body.productId;
 const title=req.body.title;
 const description=req.body.description;
 const price=req.body.price;
  const imageUrl=req.body.imageUrl;
  const updatedProduct=new Product(prodId,title,imageUrl,description,price);
  updatedProduct.save()
  res.redirect("/admin/products")
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({//add product with sequelize
  
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description

  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
 Product.deleteProduct(prodId);
 res.redirect('/')
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
