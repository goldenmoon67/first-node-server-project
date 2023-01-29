const http= require("http");
const express=require("express");

const app=express();
app.use("/mirac",(req,res,next)=>{
    console.log("in the another middleware Mirac")
    res.send('<h1> Mirac Altinay </h1>')
});
app.use("/",(req,res,next)=>{
    console.log("in the another middleware")
    res.send('<h1> Hello from express </h1>')
});
app.listen(3000);