const express= require("express");

const router=express.Router();


router.get("/",(req,res,next)=>{//we did it as a get method. this is important
    res.send('<h1> Hello from express </h1>')
});


module.exports=router;