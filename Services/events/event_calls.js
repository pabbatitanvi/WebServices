
const {ObjectId} = require('mongodb');
const event = require('./event_services.js')

module.exports = function(app){
    // ----------------------------------------- Events -----------------------------------------
    app.post('/createevent', async(req, res) =>{
        let data = await event.eventAdd(req.body)
        console.log(data, "Event data added");
        return res.send("Event created");
    })
    app.put('/modifyevent/:id', async(req,res) => {
        const eventId = new ObjectId(req.params.id)
        const updateData = req.body
        console.log(updateData, 'Update Data')
        let data = await event.eventModify(eventId, updateData)
        console.log(data, "Event modified")
        return res.send("Event modified")
    })
    app.delete('/deleteevent/:id', async(req,res) => {
        const eventId = new ObjectId(req.params.id)
        let data = await event.eventDelete(eventId);
        console.log(data, "Event deleted");
        return res.send("Event deleted");
    })
    app.get('/geteventinfobytag/:tags', async(req, res) => {
        const tags = req.params.tags;
        let data = await event.eventByTag(tags);
        console.log(data, "Events by tags");
        return res.json(data);
    })
    app.get('/getevents', async(req, res) => {
        let data = await event.getEvent();
        console.log(data);
        return res.json(data);
    })
    app.get('/geteventbyorgid/:id', async(req, res) => {
        const orgId = req.params.id;
        console.log(orgId)
        let data = await event.eventByOrg(orgId)
        console.log(data, "org events")
        return res.json(data)
    })
    app.get('/geteventinfobyprice/:price', async(req, res) => {
        const price = req.params.price;
        let data = await event.eventByPrice(price);
        console.log(data, "Events by price");
        return res.json(data);
    })
    app.get('/geteventbyname/:name', async(req, res) => {
        const name = req.params.name;
        let data = await event.eventByName(name);
        console.log(data, "Events by price");
        return res.json(data);
    })
    app.get('/geteventinfobyarea/:area', async(req, res) => {
        const area = req.params.area; 
        let data = await event.eventByArea(area);
        console.log(data, "Event by area");
        return res.send("Event searched for by area");
    })

    //These did not get done this week for various reasons
    //The team needs to further discuss how we are attaching hosts to the events
    app.get('/geteventinfobyhost/:host', async(req, res) => {
        const host = req.params.host;
        console.log(host)
        let data = await event.eventByHost(host);
        console.log(data, "Event by host");
        return res.json(data)
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
    app.get('/geteventid/:eventid', async(req, res) => {
        const eventID = new ObjectId(req.params.eventid)
        let data = await event.getEventByID(eventID)
        console.log(data);
        return res.json(data);
    })
}