const express= require("express");
const path =require("path");
const rootDir=require("../utils/path.js");
const adminData=require("../routes/admin.js");

const router=express.Router();


router.get("/",(req,res,next)=>{
    const products=adminData.products;
    res.render("shop",{prods:products,appTitle:"Shop App"})//this will find our shoup.pug file, and the paramaters will be useaful for pug file
});


module.exports=router;