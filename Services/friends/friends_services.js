const mongodb = require('../database.js');
const {ObjectId} = require('mongodb');

//Search for freinds by tag
async function friendsByTag(tags){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.find({ChooseTags: tags}).toArray()
        return data
    }catch (err){
        console.error(err)
        throw err
    }
}
//Search for freinds by username 
async function friendsByUsername(userId, username){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.updateOne({_id: new ObjectId(userId)}, {$addToSet: {Friends: username}});
        return data
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