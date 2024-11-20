// Add event to database
async function eventAdd(database, userob){
    console.log(userob,'User Object')
    try{
        //inserts event data into the database
        let data = await database.collection('Events').insertOne(userob)
        //returns the id of the event created
        return data.insertedId
    } catch (err){ 
        console.error(err)
        throw err
    }
}

//Modify Event data to database
async function eventModify(database, eventID, updateData){
    try{
        //Delete event by id
        let data = await database.collection('Events').updateOne(
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
async function eventDelete(database, eventID){
    try{
        //delete user by id
        let data = await database.collection('Events').deleteOne({_id: eventID})
        console.log('Event Deleted')
    }catch (err){
        console.error(err)
        throw err
    }
}

//Get event by price
async function eventByPrice(database, price){
    if(price >= 0){
        try{
            //create an array of all occurences of the price
            let data = await database.collection('Events').find({Price: price}).toArray()
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
async function eventByTag(database, tags){
    try{
        //creates an array of all occurences of tag
        let data = await database.collection('Events').find({Tags: tags}).toArray()
        return data
    }catch{
        console.error(err)
        throw err
    }
}

//get event by area
async function eventByArea(database, area){
    try{
        //create a list of events at a location
        let data = await database.collection('Events').find({Location: area}).toArray()
        return data
    }catch{
        console.error(err)
        throw err
    }
}

//get event by host 
async function eventByHost(database, host){
    try{
        //create a list of events from a specific host
        let data = await database.collection('Events').find({Host: host}).toArray()
        return data
    }catch{
        console.error(err)
        throw err
    }
}

//Share event
async function shareEvent(database, eventID){
    try{
        let data = await database.collection('Events').insertOne(eventID)
        return data.insertedID
    }catch{
        console.error(err)
        throw err
    }
}

//Get event address
async function eventLocation(database, eventID){
    try{
        //Returns location from event ID
        let data = await database.collection('Events').find({_id: eventID})
        return data
    }catch (err){
        console.error(err)
        throw err
    }
}

module.exports = {eventAdd, eventModify, eventDelete, eventByPrice, eventByTag, eventByArea, eventByHost, shareEvent, eventLocation};