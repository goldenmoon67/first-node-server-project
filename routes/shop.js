const express= require("express");
const path =require("path");
const rootDir=require("../utils/path.js");
const adminData=require("../routes/admin.js");

const router=express.Router();


router.get("/",(req,res,next)=>{
    const products=adminData.products;
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,//this things for the handlebars
        activeShop: true,
        productCSS: true
      });
});


module.exports=router;