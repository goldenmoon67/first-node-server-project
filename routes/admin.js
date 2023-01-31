const express= require("express");
const path=require("path");
const rootDir=require("../utils/path.js");

const router=express.Router();

const products=[];
router.get("/add-product",(req,res,next)=>{
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true });//handlebars takes if else like that


});

router.post("/add-product",(req,res,next)=>{
    products.push({title:req.body.title});
    res.redirect("/");
});

exports.router=router;
exports.products=products;