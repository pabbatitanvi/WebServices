const mongodb = require('../database.js');

//Search for freinds by tag
async function friendsByTag(tags){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.find({Tags: tags}).toArray()
        return data
    }catch{
        console.error(err)
        throw err
    }
}
//Search for freinds by username 

//Delete Freind