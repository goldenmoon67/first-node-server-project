const bodyParser= require("body-parser");
const express=require("express");
const adminData= require("./routes/admin");
const shopRouter=require("./routes/shop");
const path = require("path");




const app=express();
app.set('view engine','pug');//we added pug
app.set('views','views');//this the where we created pug

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/admin",adminData.router);
app.use(shopRouter);
app.use((req,res,next)=>{
    res.status  (404).send("<h1>Page Not Found<h1>");
})
app.listen(3000);