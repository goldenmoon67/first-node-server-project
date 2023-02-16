const fs= require("fs");
const path= require("path");

const getProductsFromFile=(cb)=>{
    //we will use it to make better our code
}

module.exports = class Product{
    constructor(title) {
        this.title=title;
    }

    save(){
        const p=path.join(path.dirname(require.main.filename),'data','products.json');
        fs.readFile(p,(err,fileContent)=>{
            let products=[];
            if(!err){
                products=JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            })
        });
    }

   static fetchAll(cb){//we are getting an error about length. this is coming from readFile code block. beacuse we use return inside of this code block. fetch all returns returns nothing
    const p=path.join(path.dirname(require.main.filename),'data','products.json');
    fs.readFile(p,(err,fileContent)=>{
        if(err){
           cb( []);
        }
       return cb( JSON.parse(fileContent));
    });
    }
}