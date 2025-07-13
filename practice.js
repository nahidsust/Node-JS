const http=require('http')
const path=require('path')
const fs=require('fs')
const querystring =require('querystring')
const mysql=require('mysql2')
let connection=mysql.createConnection({
    host: 'localhost',
  user: 'root',
  password: 'Nahid4245!',         // or your MySQL root password
  database: 'nahid'
})
connection.connect()
const server=http.createServer((req,res)=>{


if(req.url==='/'){
  const x=path.join(__dirname,'about.html')
  fs.readFile(x,(err,r)=>{
    if(err)res.end('Error')
      else{
 
    res.end(r)
      }
  })
}else if(req.url==='/sum' && req.method==='POST'){
  let body='';
  req.on('data',p=>{
    body+=p;
  })
req.on('end',()=>{
  const x=querystring.parse(body);
  const Name=x.uname;
  const Email=x.mail;
     res.writeHead(200, { 'Content-Type': 'text/plain' });
     connection.query('insert into naming(name) values(?)',[Name])
  res.end(`${Name} stored and ${Email} only showing`)
})


}else if(req.url==='/practice.html'){
    const x=path.join(__dirname,'practice.html')
  fs.readFile(x,(err,r)=>{
    if(err)res.end('Error')
      else{
 
    res.end(r)
      }
  })
}
})
server.listen(1000)