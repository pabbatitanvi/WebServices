

const location = require('./location_services.js')
const post = require('./post_services.js')
const event = require('./event_services.js')
const org=require('./organization_services.js')

const user_calls = require('./users/user_calls.js')
const post_calls = require('./posts/post_calls.js')

const mongodb = require('./database.js')

// All the typical, copy-pasted material that appears at the start of pretty much every program like this.
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    next();
})

mongodb.connect();

// Listen at port
app.listen(port, () =>{
    console.log(`Listening to active port ${ port }`)
})

user_calls(app);
post_calls(app);

// ----------------------------------------- Organizations -----------------------------------------

//Create orgnizations[Add to DB]
app.post('/createorganization', async(req, res) => {
    let data=await org.organizationAdd(db, req.body)
    console.log(data, "USER DATA ADDED")
    return res.send("Organization created")
})

//Modify organizations[Update in DB]
app.post('/modifyorganization/:id', async(req, res) => {
    const orgId = new ObjectId(req.params.id)
    const updateData = req.body
    console.log(updateData, 'Updata data')
    let data = await org.orgModify(db, orgId, updateData)
    console.log(data, "Org modified");
    return res.send("Org modified");
})

//Delete organization from DB
app.delete('/deleteorg/:id', async(req, res) => {
    const orgId = new ObjectId(req.params.id)
    let data=await org.orgDelete(db, orgId);
    console.log(data, "Org deleted");
    return res.send("Org deleted");
})

//Find all organizations with a certain tag
app.get('/getorgbytag/:tag', async(req, res) => {
    const orgtag = req.params.tag
    let data = await org.orgByTag(db, orgtag)
    console.log("Orgs based on selected tag", data);
    return res.send("Information is displayed");
})

// ----------------------------------------- Locations -----------------------------------------

// Create location (add to database)
app.post('/createlocation', async(req, res) => {
    const addData = req.body
    let data = await location.locationAdd(db, addData)
    console.log(data, "LOCATION ADDED")
    return res.send("Location Created")
})

// Delete location (remove from database)
app.delete('/deletelocation/:id', async(req, res) => {
    const locationID = new ObjectId(req.params.id)
    let data = await location.locationDelete(db, locationID);
    console.log("Location deleted");
    return res.send("Location deleted");
})

// Modify location (remove from database)
app.put('/modifylocation/:id', async(req, res) => {
    const locationID = new ObjectId(req.params.id)
    const updateData = req.body
    console.log(updateData, "Location modified");
    let data = await location.locationModify(db, locationID, updateData);
    console.log(data, "Location modified");
    return res.send("Location modified");
})

// Return all locations with the inputted tag
app.get('/taginfo/:tag', async(req, res) =>{
    const tag = req.params.tag
    let data = await location.locationSearch(database = db, searchFor = "tags", {searchValue : tag});
    console.log(`LOCATION SEARCHED FOR ${tag} tag`)
    return res.send("Searched for a location")
})

// Return all locations that match the specified price range
app.get('/priceinfo/:price', async (req,res)=>{
    const price = Number(req.params.price)
    let data = await location.locationSearch(database = db, searchFor = "price", {searchValue : price})
    console.log(data, "LOCATION SEARCHED FOR")
    return res.send("Searched for a location")
})

// Return all locations in the specified area (NEEDS WORK)
app.get('/areainfo/:area', async (req,res)=>{
    const area = req.params.area
    let data = await location.locationSearch(database = db, searchFor = "area", {searchValue : area})
    console.log(data, "LOCATION SEARCHED FOR")
    return res.send("Searched for a location")
})

// ----------------------------------------- Friends -----------------------------------------
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


// ----------------------------------------- Events -----------------------------------------
app.post('/createevent', async(req, res) =>{
    let data = await event.eventAdd(db, req.body)
    console.log(data, "Event data added");
    return res.send("Event created");
})
app.put('/modifyevent/:id', async(req,res) => {
    const eventId = new ObjectId(req.params.id)
    const updateData = req.body
    console.log(updateData, 'Update Data')
    let data = await event.eventModify(db, eventId, updateData)
    console.log(data, "Event modified")
    return res.send("Event modified")
})
app.delete('/deleteevent/:id', async(req,res) => {
    const eventId = new ObjectId(req.params.id)
    let data = await event.eventDelete(db, eventId);
    console.log(data, "Event deleted");
    return res.send("Event deleted");
})
app.get('/geteventinfobytag/:tags', async(req, res) => {
    const tags = req.params.tags;
    let data = await event.eventByTag(db, tags);
    console.log(data, "Events by tags");
    return res.send("Event searched for by tags");
})
app.get('/geteventinfobyprice/:price', async(req, res) => {
    const price = req.params.price;
    let data = await event.eventByPrice(db, price);
    console.log(data, "Events by price");
    return res.send("Event searched for by price");
})
app.get('/geteventinfobyarea/:area', async(req, res) => {
    const area = req.params.area; 
    let data = await event.eventByArea(db, area);
    console.log(data, "Event by area");
    return res.send("Event searched for by area");
})

//These did not get done this week for various reasons
//The team needs to further discuss how we are attaching hosts to the events
app.get('/geteventinfobyhost/:host', async(req, res) => {
    let data = await event.eventByHost(db, host);
    console.log(data, "Event by host");
    return res.send("Event searched for by host");
})
//This will require the maps API which we are looking further in next week 
app.get('/geteventaddress/id', async(req, res) => {
    console.log(req.body.Coordinates);
    console.log("Converting inputted coordinates to an address");
    let reply = {
        "Address" : "1060 Bayberry Dr, State College, PA 16801"
    }
    return res.send(reply);
})
//This needs further research for implmentation
app.post('/shareevent', (req, res) => {
    console.log(req.body);
    return res.send("Event shared");
})



//--------------------------------------------------------------------------------------------------------------
//SERVICE RELATED FUNCTIONS

// Add organization to database


// Add event to database
// async function eventAdd(userob){
//     console.log(userob,'User Object')
//     let data = await db.collection('Events').insertOne(userob, function(err, result) {
//         if(err) console.log(err)
//         return result
//     })
// }

