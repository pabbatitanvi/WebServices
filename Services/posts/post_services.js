
const mongodb = require('../database.js');

//Add post data to database
async function postAdd(userob) {
    console.log(userob, 'User Object')
    _database = mongodb.getDb().collection('Posts')
    try{
        //inserts data into the database
        let data = await _database.insertOne(userob)
        //returns the unique id of the data created
        return data.insertedId
    } catch (err){
        console.error(err)
        throw err
    }
}

//Modify post data to database
async function postModify(postId, updateData){
    _database = mongodb.getDb().collection('Posts')
    try{
        //modifies data using the id
        let data = await _database.updateOne({_id: postId}, {$set: updateData})
        console.log('Post modified in mongodb')
        //return data;
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Delete post data
async function postDelete(postId){
    _database = mongodb.getDb().collection('Posts')
    try{
        //deletes the post data using the id
        let data = await _database.deleteOne({_id: postId})
        console.log('Post deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}
// Get ALL posts
async function getPosts(){
    _database = mongodb.getDb().collection('Posts')
    let data = await _database.find().toArray()
    return data
}

//Get post by location
async function postByLocation(location){
    _database = mongodb.getDb().collection('Posts')
    try{
        //creates an array of all the occurences of the location
        let data = await _database.find({LocationName: location}).toArray()
        if(data.length <= 0){
            console.log("Results is empty. No results.")
            return 0
        } else{
            return data
        }
    } catch (err) {
        console.error(err)
        console.error("An error has occured in the postByLocation backend function!")
        throw err
    }
}

//Get post by user
async function postByUser(userId){
    _database = mongodb.getDb().collection('Posts')
    try{
        //creates an array of all the occurences of the userId
        let data = await _database.find({UserId: userId}).toArray()
        if(data.length <= 0){
            console.log("Results is empty. No results.")
            return 0
        } else{
            return data
        }
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function postByTag(tag, maxNumResults = Number.MAX_SAFE_INTEGER){

    _database = mongodb.getDb().collection('Posts')
    
    cursor = _database.find(
        {
            Tags: tag,
        }
    ).sort({name : 1})// sort alphabetically
    .limit(maxNumResults);
    
    const results = await cursor.toArray();
    if(results.length > 0){
        console.log(`Found listing(s) with tag ${tag}`);
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.locationName}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   Caption: ${result.Caption}`);
            console.log(`   Location name: ${result.LocationName}`);
            console.log(`   Date: ${result.Date}`);
        });
        return results;
    } else {
        console.log(`No listings found with tag ${tag} (or something went wrong)`);
        console.log(`results : ${results}`);
        console.log(`search values : ${tag}`)
        return 0;
    }
}

async function getPostInfo(postID){
    _database = mongodb.getDb().collection('Posts')
    let data = await _database.findOne({_id: postID})
    return JSON.stringify(data)
}

module.exports = {postAdd, postModify, postDelete, postByLocation, postByUser, postByTag, getPosts, getPostInfo};