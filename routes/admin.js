const express= require("express");
const path=require("path");
const rootDir=require("../utils/path.js");

const router=express.Router();

const products=[];// we will keep datas
router.get("/add-product",(req,res,next)=>{
    res.sendFile(path.join(rootDir,"views","add-product.html"));// {rootDir} better than other way
});

router.post("/add-product",(req,res,next)=>{
    products.push({title:req.body.title});
    res.redirect("/");
});

exports.router=router;
exports.products=products;