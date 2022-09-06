var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

var db= mongoose.connection;

db.on('error',()=>console.log("error in connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

app.post("/login",(req,res)=>{
    var username= req.body.uname;
    var password= req.body.psw;

    var data={
        "username":username,
        "password":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully");   
     });


return res.redirect('login_succesfull.html')
})

app.get("/",(req,res)=>{
    res.set({
       "Allow-access-Allow-Origin": '*'
   
    })
   return res.redirect('index.html')
}).listen(3000);


console.log("listening on port 3000")