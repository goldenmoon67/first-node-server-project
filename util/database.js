const mysql=require('mysql2');

const pool=mysql.createPool( //mysql.createConnect is not good to use.
// Because we have to close it when we compleated the issue. But pool does it automaticly
{   
    host:'local',
    user:'root', 
    password:'21219467107',
    database:'node-server-db'
}
);

module.exports=pool.promise();//promise better than callback