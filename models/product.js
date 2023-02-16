const fs= require("fs");
const path= require("path");
const p=path.join(path.dirname(require.main.filename),'data','products.json');
const getProductsFromFile=cb=>{
  
    fs.readFile(p,(err,fileContent)=>{
        if(err){
           cb( []);
        }else{
            cb( JSON.parse(fileContent));
        }
       
    });
}

module.exports = class Product{
    constructor(title) {
        this.title=title;
    }

    save(){

        getProductsFromFile((products)=>{
            products.push(this);
            fs.writeFile(p,JSON.stringify(products),(err)=>{
                console.log(err);
            })
        });
        
    }

   static fetchAll(cb){//we are getting an error about length. this is coming from readFile code block. beacuse we use return inside of this code block. fetch all returns returns nothing
        getProductsFromFile(cb);
    }
}