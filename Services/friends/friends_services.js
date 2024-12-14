const mongodb = require('../database.js');
const {ObjectId} = require('mongodb');

//Search for friends by finding other users with all the same tags as this user
async function friendsByTag(tags){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.find({chooseTags: { $all : tags} }).toArray()
        return data
    }catch (err){
        console.error(err)
        throw err
    }
}
//Search for friends by username 
async function friendsByUsername(userId, username){
    _database = mongodb.getDb().collection('Users')
    try{
        const userAdd = await _database.findOne({username: username});
        let data = await _database.updateOne({_id: new ObjectId(userId)}, {$addToSet: {friends: userAdd._id.toString()}});
        return data.insertedId
    }catch (err){
        console.error(err)
        throw err
    }
}

//delete friend
async function deleteFriend(userId, username){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.updateOne({_id: new ObjectId(userId)}, {$pull: {Friends: username}});
        return data
    }catch (err){
        console.error(err)
        throw err
    }
}

module.exports = {friendsByTag, friendsByUsername, deleteFriend}