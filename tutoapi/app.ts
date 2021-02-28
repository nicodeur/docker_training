const express = require('express')

const app = express()

//log in standard output
console.log("Our application is launching!");

//we define a entrypoint on '/'. When a get is performed on '/', we log "youpi" and send the response
app.get('/', function (req:any, res:any) {
  console.log("youpi");
  //send the response
  res.send("Hello you!");
})

//we launch the webserver on port 3000 and log when it's up
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


let mysql = require('mysql');


let MYSQL_HOST = process.env.MYSQL_HOST;
let MYSQL_USER = process.env.MYSQL_USER;
let MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
let MYSQL_DATABASE = process.env.MYSQL_DATABASE;



// Create a mysql connection object
let con = mysql.createConnection({
  host: MYSQL_HOST ,
  user: MYSQL_USER ,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE
});

let users: any;

con.connect(function(err: any) {
  if (err) throw err;
  con.query("SELECT * FROM USERS", function (err: any, result: any, fields: any) {
    if (err) throw err;
    users = result;
    console.log(result);
  });
});


app.get('/users', function (req: any, res: any) {
  //send users value as the response
  res.send(users);
})
 



