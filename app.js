const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize=require("./util/database");
const Product=require("./models/product");
const User=require("./models/user");
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//we did it to acces the user from everywhere
app.use((req,res,next)=>{
    User.findByPk(1)
    .then((user) => {
        req.user=user;
        next();
    }).catch((err) => {
    console.log(err);
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true, onDelete:"CASCADE"});//this is for realotion
User.hasMany(Product);
sequelize.sync({force:true})
.then((result) => {
    return User.findByPk(1);

}).then(user=>{
    if(!user){
      return  User.create({name:"mirac altinay", email:"mrc@it.com"});//creating dummy user
    }
    return user;
}).then(user=>{
    console.log(user);
    app.listen(3000);

}).catch((err) => {
    console.log(err);
});
