const bodyParser= require("body-parser");
const express=require("express");
const adminData= require("./routes/admin");
const shopRouter=require("./routes/shop");
const path = require("path");




const app=express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")))// this is to get css file to html files

app.use("/admin",adminData.router);//now every url will get {/admin} before itselves
app.use(shopRouter);
app.use((req,res,next)=>{
    res.status  (404).send("<h1>Page Not Found<h1>");
})
app.listen(3000);