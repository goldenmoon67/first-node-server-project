
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
  Product.findByPk(prodId).then((product) => {
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',  
      path: '/admin/edit-product',
      editing:editMode,
      product:product,
    });
  }).catch((err) => {
    console.log(err);
  });
 
  
};
exports.postEditProduct = (req, res, next) => {
 const prodId=req.body.productId;
 const title=req.body.title;
 const description=req.body.description;
 const price=req.body.price;
  const imageUrl=req.body.imageUrl;
  Product.findByPk(prodId)
  .then((product) => {
    product.title=title;
    product.description=description;
    product.price=price;
    product.imageUrl=imageUrl;
    return product.save();//I can say .then(redirect(bla bla) but it is realy ugly. I return this then I add new then block. Now 1 cathc block will work for 2 then block)

  }).then(response=>{ 
    console.log(response);
    res.redirect("/admin/products");
  }
  ).catch((err) => {
    console.log(err);
  });

};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
  //this function coming with realition things
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description

  })///also we can use it as below
  /*
  Product.create({
  
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description,
    userId:req.user.id
  })*/
  .then((result) => {
    console.log(result);
   res.redirect("/admin/products")
  }).catch((err) => {
    console.log(err);
  });
};
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then((product) => {
   return product.destroy();
   
  }).then((response)=>{
    console.log(response);
    res.redirect("/");
  })
  .catch((err) => {
    console.log(err);
  });
 res.redirect('/admin/products')
};
exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((err) => {
    console.log(err);

  });
 
};
