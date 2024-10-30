
// CONNECT TO DATABASE (AGAIN???)
const {ObjectId} = require('mongodb');
let MongoClient = require('mongodb').MongoClient

const connectionString = "mongodb+srv://ssg5387:123ssg@getoutthere.l8cjg.mongodb.net/TestDB?retryWrites=true&w=majority&appName=GetOutThere"
const client = new MongoClient(connectionString);
let conn;
    let db;
    connect();
    async function connect(){
        try {
            conn = await client.connect();
            db = await conn.db("TestDB");
            console.log("database connected !!")
          } catch(e) {
            console.error(e);
          }
    }
    async function disconnect(){
        await client.close();
    }




// Add location to the database
async function locationadd(userob){
    
    console.log(userob, 'User Object')
    let result = await db.collection('Locations').insertOne(userob, function(err, result) {
        if(err) console.log(err)
    })
    return result
}

// Search locations by price, tag, or area (area to be added later after group discussion)
async function locationsearch(searchFor = "", {searchValue = 0, maxNumResults = Number.MAX_SAFE_INTEGER}){

    var cursor = null;
    // search by max price
    if(searchFor.toLowerCase() == "price"){

        // NOTE! Does NOT validate that searchValue is a valid input (I haven't figured out how yet)

        cursor = db.collection("Locations").find(
            {
                price: { $lte : searchValue},
            }
        ).sort({name : 1})// sort alphabetically
        .limit(maxNumResults); // limit to this number of results (can be set when function called)

    } else if(searchFor.toLowerCase() == "tags"){

        cursor = db.collection("Locations").find(
            {
                tags: searchValue,
            }
        ).sort({name : 1})
        .limit(maxNumResults);
    } else{
        console.log(`ERROR, INVALID SEARCH ATTEMPT WITH searchFor = ${searchFor} AND searchValue = ${searchValue} \t\tSearching by price now.`)
        cursor = db.collection("Locations").find(
            {
                price: { $lte : searchValue},
            }
        ).sort({name : 1})
        .limit(maxNumResults);
    }
    

    const results = await cursor.toArray();
    if(results.length > 0){
        console.log(`Found listing(s) with ${searchValue} ${searchFor} price`);
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
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
async function locationdelete(locationID){
    try{
        let data = await db.collection('Locations').deleteOne({_id: locationID})
        console.log('Location deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {locationadd, locationsearch, locationdelete};