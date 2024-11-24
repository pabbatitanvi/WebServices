const mongodb = require('../database.js');

//Search for freinds by tag
async function friendsByTag(tags){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.find({ChooseTags: tags}).toArray()
        return data
    }catch{
        console.error(err)
        throw err
    }
}
//Search for freinds by username 
async function friendsByUsername(userId, username){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.find({_id: userId, Username: username})
        return data
    }catch{
        console.error(err)
        throw err
    }
}

//delete friend

module.exports = {friendsByTag, friendsByUsername}