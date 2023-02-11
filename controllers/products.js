
const products=[];

exports.getProducts= (req,res,next)=>{

    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,//this things for the handlebars
        activeShop: true,
        productCSS: true
      });
}

exports.getAddProducts=(req,res,next)=>{
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });//handlebars takes if else like that
}

exports.postAddProducts=(req,res,next)=>{
    products.push({title:req.body.title});
    res.redirect("/");
}