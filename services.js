// All the typical, copy-pasted material that appears at the start of pretty much every program like this.
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "https://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    next();
})

let MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb+srv://amm10089:amm1008@getoutthere.l8cjg.mongodb.net/?retryWrites=true&w=majority&appName=GetOutThere"
const client = new MongoClient(connectionString);
let conn;
    let db;
    connect()
    async function connect(){
        try {
            conn = await client.connect();
            db = await conn.db("sample_mflix");
            console.log("database connected !!")
          } catch(e) {
            console.error(e);
          }
    }

// Listen at port
app.listen(port, () =>{
    console.log(`Listening to active port ${ port }`)
})

// -------- User Accounts --------
app.post('/createuser', async(req, res) => {
    let data=await useradd(req.body)
    console.log(data, "USER DATA ADDED")
    res.send("User Created")
})
app.post('/createorganization', async(req, res) => {
    console.log(req.body);
    return res.send("Organization created")
})
app.post('/modifyuser', async(req, res) => {
    console.log(req.body);
    return res.send("User modified")
})
app.post('/modifyorganization', async(req, res) => {
    console.log(req.body);
    return res.send("Organization modified")
})
app.delete('/deleteuser', async(req, res) => {
    console.log(req.body);
    return res.send("User deleted")
})
app.post('/login', async(req, res) => {
    console.log(req.body);
    return res.send("Logged in")
})

// -------- Locations --------
app.post('/createlocation', (req, res) => {
    console.log(req.body)
    return res.send("Location Created")
})


app.get('/taginfo', (req, res) =>{


    console.log(req.body.Tags)
    console.log("location info based on tags")
    let reply = {
        "LocationID1" : "1234",
        "LocationID2" : "3333",
        "LocationID3" : "4444"
    }
    return res.json(reply)
})


app.get('/priceinfo', async (req,res)=>{
    console.log(req.body.Price)
    console.log("Location info based on price")
    let reply = {
        "LocationID1" : "4321",
        "LocationID2" : "1111",
        "LocationID3" : "2222"
    }
    return res.json(reply)


})
app.get('/areainfo', async (req,res)=>{
    
    console.log("Location info based on tags")
    let replyarray = {//comes from database
        "LocationID1" : "2468",


        "LocationID2" : "1357",


        "LocationID3" : "1616"


    }
    return res.json(replyarray)


})

// -------- Friends --------
app.get('/friendsbytag', async(req, res) =>{
    console.log(req.body.Friends);
    console.log("Suggesting friends based on tags");
    let replyArray = {
        "UserID1": "1010",
        "UserID2": "1111",
        "UserID3": "0001"
    }
    return res.json(replyArray);
})
app.post('/friendsbyusername', async(req, res) => {
    console.log(req.body);
    return res.send("Added Friend")
})
app.delete('/deletefriend', async(req, res) => {
    console.log(req.body);
    return res.send("Deleted Friend")
})


// -------- Events --------
app.post('/createevent', (req, res) =>{
    console.log(req.body);
    return res.send("Event created");
})
app.post('/modifyevent', (req,res) => {
    console.log(req.body);
    return res.send("Event edited");
})
app.delete('/deleteevent', (req,res) => {
    console.log(req.body);
    return res.send("Event deleted");
})
app.get('/geteventinfobytag', (req, res) => {
    console.log(req.body.Tags);
    console.log("Returning events based on tags")


    let reply = {
        "EventID1" : "7777",
        "EventID2" : "9876",
        "EventID3" : "5432"
    }


    return res.send(reply);
})
app.get('/geteventinfobyprice', (req, res) => {
    console.log(req.body.Price);
    console.log("Returning events based on price")


    let reply = {
        "EventID1" : "3141",
        "EventID2" : "5926",
        "EventID3" : "5358"
    }


    return res.send(reply);
})
app.get('/geteventinfobyarea', (req, res) => {
    console.log(req.body.Area);
    console.log("Returning events based on geographical location")


    let reply = {
        "EventID1" : "9793",
        "EventID2" : "2384",
        "EventID3" : "6264"
    }


    return res.send(reply);
})
app.get('/geteventinfobyhost', (req, res) => {
    console.log(req.body.Host);
    console.log("Returning events based on host")


    let reply = {
        "Events" : "[array of eventIDs]"
    }


    return res.send(reply);
})
app.get('/geteventaddress', (req, res) => {
    console.log(req.body.Coordinates);
    console.log("Converting inputted coordinates to an address");
    let reply = {
        "Address" : "1060 Bayberry Dr, State College, PA 16801"
    }
    return res.send(reply);
})
app.post('/shareevent', (req, res) => {
    console.log(req.body);
    return res.send("Event shared");
})


// -------- Posts --------
app.post('/createpost', (req, res) => {
    console.log(req.body);
    return res.send("Post created");
})
app.delete('/deletepost', (req, res) => {
    console.log(req.body);
    return res.send("Post deleted");
})
app.post('/modifypost', (req, res) => {
    console.log(req.body);
    return res.send("Post modified");
})
app.post('/sharepost', (req, res) => {
    console.log(req.body);
    return res.send("Post shared");
})
app.get('/getpostbylocation', (req, res) => {
    console.log(req.body.Location);
    console.log("Returning posts based on inputted location");


    let reply = {
        "PostID1" : "3383",
        "PostID2" : "2795",
        "PostID3" : "0288"
    }
    return res.send(reply);
})
app.get('/getpostbyuser', (req, res) => {
    console.log(req.body.User);
    console.log("Returning posts based on inputted user");


    let reply = {
        "PostID1" : "4197",
        "PostID2" : "1961",
        "PostID3" : "0000"
    }
    return res.send(reply);
})
app.get('/getpostbytag', (req, res) => {
    console.log(req.body.Tags);
    console.log("Returning posts based on inputted tags");


    let reply = {
        "PostID1" : "1000",
        "PostID2" : "0100",
        "PostID3" : "0010"
    }
    return res.send(reply);
})

//--------------------------------------------------------------------------------------------------------------
//SERVICE RELATED FUNCTIONS

//Add user data to DB
async function useradd(userob){
    console.log(userob,'User Object')
    let data = await db.collection('users').insertOne(userob, function(err, result) {
        if(err) console.log(err)
        return result
    })
}