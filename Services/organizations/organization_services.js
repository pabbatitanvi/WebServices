
const mongodb = require('../database.js');

//Add organization to DB
async function organizationAdd(orgob){
    console.log(orgob,'org Object')
    _database = mongodb.getDb().collection('Organizations')
    let data = await _database.insertOne(orgob, function(err, result) {
        if(err) console.log(err)
        return result
    })
}

//Update organization in DB
async function orgModify(orgId, updateData){
    _database = mongodb.getDb().collection('Organizations')
    try{
        //modifies user by id
        let data = await _database.updateOne({_id: orgId}, {$set: updateData})
        console.log('Org modified in mongodb')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Delete organization fromDB
async function orgDelete(orgId){
    _database = mongodb.getDb().collection('Organizations')
    try{
        //deletes user by id
        let data = await _database.deleteOne({_id: orgId})
        console.log('Org deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Find organizations by tag in DB
async function orgByTag(orgTag){
    _database = mongodb.getDb().collection('Organizations')
    try{
        //creates an array of all the occurences of the userId
        let data = await _database.find({Tag: orgTag}).toArray()
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function orgFind(userName){
    
    _database =  mongodb.getDb().collection('Users')
    try{
        let data = await _database.findOne({username: userName})
    
        return data;
    } catch(err){
        console.log(err)
        throw err;
    }
}

module.exports={organizationAdd, orgModify, orgDelete,  orgByTag, orgFind}