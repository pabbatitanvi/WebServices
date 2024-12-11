
const {ObjectId} = require('mongodb');
const location = require('./location_services.js')

// ----------------------------------------- Locations -----------------------------------------
module.exports = function(app){

    // Create location (add to database)
    app.post('/createlocation', async(req, res) => {
        const addData = req.body
        let data = await location.locationAdd(addData)
        console.log(data, "LOCATION ADDED")
        return res.send("Location Created")
    })

    // Delete location (remove from database)
    app.delete('/deletelocation/:id', async(req, res) => {
        const locationID = new ObjectId(req.params.id)
        let data = await location.locationDelete(locationID);
        console.log("Location deleted");
        return res.send("Location deleted");
    })

    // Modify location (remove from database)
    app.put('/modifylocation/:id', async(req, res) => {
        const locationID = new ObjectId(req.params.id)
        const updateData = req.body
        console.log(updateData, "Location modified");
        let data = await location.locationModify(locationID, updateData);
        console.log(data, "Location modified");
        return res.send("Location modified");
    })

    app.get('/getlocations', async(req, res) => {
        let data = await location.getLocations();
        console.log(data);
        return res.json(data);
    })

    // Return all locations with the inputted tag
    app.get('/getlocationbytag/:tag', async(req, res) =>{
        const tag = req.params.tag
        let data = await location.locationSearch(searchFor = "tags", {searchValue : tag});
        console.log(`LOCATION SEARCHED FOR ${tag} tag`)
        return res.send("Searched for a location")
    })

    // Return all locations that match the specified price range
    app.get('/getlocationbytag/:price', async (req,res)=>{
        const price = Number(req.params.price)
        let data = await location.locationSearch(searchFor = "price", {searchValue : price})
        console.log(data, "LOCATION SEARCHED FOR")
        return res.send("Searched for a location")
    })

    // Return all locations in the specified area (NEEDS WORK)
    app.get('/getlocationbyarea/:area', async (req,res)=>{
        const area = req.params.area
        let data = await location.locationSearch(searchFor = "area", {searchValue : area})
        console.log(data, "LOCATION SEARCHED FOR")
        return res.send("Searched for a location")
    })
}