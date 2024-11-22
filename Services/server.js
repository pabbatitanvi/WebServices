
const user_calls = require('./users/user_calls.js')
const post_calls = require('./posts/post_calls.js')
const org_calls = require('./organizations/organization_calls.js')
const location_calls = require('./locations/location_calls.js')
const event_calls = require('./events/event_calls.js')
const friend_calls = require('./friends/friend_calls.js')

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
org_calls(app);
location_calls(app);
event_calls(app);
friend_calls(app);
