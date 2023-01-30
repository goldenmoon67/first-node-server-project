const express= require("express");
const path =require("path");
const rootDir=require("../utils/path.js");
const adminData=require("../routes/admin.js");

const router=express.Router();


router.get("/",(req,res,next)=>{
    const products=adminData.products;
    res.render("shop",{prods:products,pageTitle:"Shop App",path:"/"});//this path will be useful for the button action
});


module.exports=router;