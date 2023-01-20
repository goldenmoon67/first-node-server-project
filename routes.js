

const routerHandler=(req,res)=>{
 const url=req.url
 const method=req.method

    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>My First Server Project</title></head>');
        res.write(
          '<body><h1>My First Server Project</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form></body>'
        );
        res.write('</html>');

        return res.end();
    }

    if(url==='/users'){
        res.write('<html>');
        res.write('<head><title>User List</title></head>');
        res.write(
          '<body><ul> <li>User1 </li> <li>User2 </li> <li>User3 </li> <li>User4 </li> </ul></body>'
        );
        res.write('</html>');

        return res.end();
    }


    if(url==='/create-user' && method==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split("=")[1];
            res.statusCode=302;
            res.setHeader('CreatedUser','users');
            console.log('Welcome ',message,'. You are logged in');
         return res.end()
        });
    }

}

module.exports = routerHandler;