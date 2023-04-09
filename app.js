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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User,{constraints:true, onDelete:"CASCADE"});//this is for realotion
User.hasMany(Product);
sequelize.sync({force:true})//this force is using to trigger the new changes on database we should not use it on prod version
.then((result) => {
    //console.log(result);
    app.listen(3000);

}).catch((err) => {
    
});
