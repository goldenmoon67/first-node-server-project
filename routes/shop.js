const express= require("express");
const path =require("path");
const rootDir=require("../utils/path.js");
const adminData=require("../routes/admin.js");

const router=express.Router();


router.get("/",(req,res,next)=>{
    console.log(adminData.products);
    res.render("shop")//this will find our shoup.pug file
});


module.exports=router;