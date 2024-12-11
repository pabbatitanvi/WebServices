
const mongodb = require('../database.js');

// Add location to the database
async function locationAdd(userob){
    
    console.log(userob, 'User Object')
    _database = mongodb.getDb().collection('Locations')
    let result = await _database.insertOne(userob, function(err, result) {
        if(err) console.log(err)
    })
    return result.insertedId
}

// Search locations by price, tag, or area (area to be added later after group discussion)
async function locationSearch(searchFor = "", {searchValue = 0, maxNumResults = Number.MAX_SAFE_INTEGER}){

    _database = mongodb.getDb().collection('Locations')
    var cursor = null;
    // search by max price
    if(searchFor.toLowerCase() == "price"){

        // NOTE! Does NOT validate that searchValue is a valid input (I haven't figured out how yet)

        cursor = _database.find(
            {
                price: { $lte : searchValue},
            }
        ).sort({name : 1})// sort alphabetically
        .limit(maxNumResults); // limit to this number of results (can be set when function called)

    } else if(searchFor.toLowerCase() == "tags"){

        cursor = _database.find(
            {
                tags: searchValue,
            }
        ).sort({name : 1})
        .limit(maxNumResults);
    } else{
        console.log(`ERROR, INVALID SEARCH ATTEMPT WITH searchFor = ${searchFor} AND searchValue = ${searchValue} \t\tSearching by price now.`)
        cursor = _database.find(
            {
                price: { $lte : searchValue},
            }
        ).sort({name : 1})
        .limit(maxNumResults);
    }
    

    const results = await cursor.toArray();
    if(results.length > 0){
        console.log(`Found listing(s) with ${searchValue} ${searchFor} `);
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.locationName}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   description: ${result.description}`);
            console.log(`   price: ${result.price}`);
        });
    } else {
        console.log(`No listings found with ${searchValue} ${searchFor} (or something went wrong)`);
        console.log(`results : ${results}`);
        console.log(`cursor : ${cursor}`);
        console.log(`type of searchValue: ${typeof searchValue}`)
    }

}

// Delete location from database (need to run by team, for now this is mostly so I can use postman to clean the database)
//Delete post data
async function locationDelete(locationID){
    _database = mongodb.getDb().collection('Locations')
    try{
        let data = await _database.deleteOne({_id: locationID})
        console.log('Location deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Modify post data
async function locationModify(locationID, updateData){
    _database = mongodb.getDb().collection('Locations')
    try{
        //modifies data using the id
        let data = await _database.updateOne({_id: locationID}, {$set: updateData})
        console.log('Location modified in mongodb')
        //return data;
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function getLocations(){
    _database = mongodb.getDb().collection('Locations')
    let data = await _database.find().toArray()
    return data
}

module.exports = {locationAdd, locationSearch, locationDelete, locationModify,getLocations};