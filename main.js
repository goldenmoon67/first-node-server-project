const bodyParser= require("body-parser");
const express=require("express");
const adminRouter= require("./routes/admin");
const shopRouter=require("./routes/shop");
const path = require("path");



const app=express();

app.set('view engine','ejs');//ejs is coming with express 
app.set('views','views');//this the where we created handlebars

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/admin",adminRouter);
app.use(shopRouter);


app.use((req,res,next)=>{
    res.status  (404).send("<h1>Page Not Found<h1>");
})
app.listen(3000);