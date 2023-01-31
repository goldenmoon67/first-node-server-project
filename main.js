const bodyParser= require("body-parser");
const express=require("express");
const adminData= require("./routes/admin");
const shopRouter=require("./routes/shop");
const path = require("path");
const expressHbs= require("express-handlebars");//pug was coming with express but handlebars not like that. thats why we should import it



const app=express();
app.engine(
    'hbs',
    expressHbs.engine({
      layoutsDir: 'views/layouts/',//we have define layouts
      defaultLayout: 'main-layout',//also we have to define default layout
      extname: 'hbs'//extname should be aslo
    })
  );//now we added the handlebars to express as a engine
app.set('view engine','hbs');//we added handlebars
app.set('views','views');//this the where we created handlebars

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

app.use("/admin",adminData.router);
app.use(shopRouter);
app.use((req,res,next)=>{
    res.status  (404).send("<h1>Page Not Found<h1>");
})
app.listen(3000);