
const mongodb = require('../database.js');

// Add event to database
async function eventAdd(userob){
    console.log(userob,'User Object')
    _database = mongodb.getDb().collection('Events')
    try{
        //inserts event data into the database
        let data = await _database.insertOne(userob)
        //returns the id of the event created
        return data.insertedId
    } catch (err){ 
        console.error(err)
        throw err
    }
}

//Modify Event data to database
async function eventModify(eventID, updateData){
    _database = mongodb.getDb().collection('Events')
    try{
        //Delete event by id
        let data = await _database.updateOne(
                {_id: eventID}, 
                {$set: updateData}
            )
        console.log('User modified in mongoDB')
    }catch (err){
        console.error(err)
        throw err
    }
}

//Delete Event
async function eventDelete(eventID){
    _database = mongodb.getDb().collection('Events')
    try{
        //delete user by id
        let data = await _database.deleteOne({_id: eventID})
        console.log('Event Deleted')
    }catch (err){
        console.error(err)
        throw err
    }
}
//get all events
async function getEvent(){
    _database = mongodb.getDb().collection('Events')
    let data = await _database.find().toArray()
    return data
}
async function eventByOrg(id){
    _database = mongodb.getDb().collection('Events')
    try{
        //create a list of events at a location
        let data = await _database.find({organization: id}).toArray()
        return data
    }catch{
        console.error(err)
        throw err
    }
}
//Get event by price
async function eventByPrice(price){
    _database = mongodb.getDb().collection('Events')
    const priceDouble = parseFloat(price)
    if(priceDouble >= 0){
        try{
            //create an array of all occurences of the price
            let data = await _database.find({price: {$lte: priceDouble}}).toArray()
            return data
        }catch (err){
            console.error(err)
            throw err
        }
    }else{
        console.log('Invalid price');
    }
    
}

//get event by tag
async function eventByTag(tags){
    _database = mongodb.getDb().collection('Events')
    try{
        //creates an array of all occurences of tag
        let data = await _database.find({chooseTags: { $in: [tags]}}).toArray()
        return data
    }catch(err){
        console.error(err)
        throw err
    }
}
async function eventByName(name){
    _database = mongodb.getDb().collection('Events')
    try{
        const names = new RegExp(name, 'i')
        let data = await _database.find({eventName: {$regex: names}}).toArray()
        return data
    }catch(err){
        console.error(err)
        throw err
    }
}

//get event by area
async function eventByArea(area){
    _database = mongodb.getDb().collection('Events')
    try{
        //create a list of events at a location
        let data = await _database.find({Location: area}).toArray()
        return data
    }catch{
        console.error(err)
        throw err
    }
}

//get event by host 
async function eventByHost(host){
    _database = mongodb.getDb().collection('Events')
    _databaseOrg = mongodb.getDb().collection('Organizations')
    try{
        let orgData = await _databaseOrg.findOne({organizationName: host})
        if(!orgData){
            console.log("error getting org")
        }
        else{
            const orgID = orgData._id.toString()
            let data = await _database.find({organization: orgID}).toArray()
            return data
        }
    }catch(err){
        console.error(err)
        throw err
    }
}
//Share event
async function shareEvent(eventID){
    _database = mongodb.getDb().collection('Events')
    try{
        let data = await _database.insertOne(eventID)
        return data.insertedID
    }catch{
        console.error(err)
        throw err
    }
}

//Get event address
async function eventLocation(eventID){
    _database = mongodb.getDb().collection('Events')
    try{
        //Returns location from event ID
        let data = await _database.find({_id: eventID})
        return data
    }catch (err){
        console.error(err)
        throw err
    }
}
async function getEventByID(eventID){
    _database = mongodb.getDb().collection('Events')
    let data = await _database.findOne({_id: eventID})
    return JSON.stringify(data)
}
module.exports = {eventAdd, eventModify, eventDelete, getEvent, eventByPrice, eventByTag, eventByArea, eventByHost, shareEvent, eventLocation, getEventByID, eventByName, eventByOrg};