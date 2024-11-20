
const mongodb = require('../database.js');

//Add user data to DB
async function userAdd(userob){

    _database = mongodb.getDb().collection('Users')

    console.log(userob, "Data receivved from services.js")
    try{
        //inserts user data into the database
        console.log("database:", _database);
        let data = await _database.insertOne(userob)
        //returns the id of the data created
        return data.insertedId
    } catch(err) {
        console.error(err)
        throw err
    }
}

///Delete user data
async function userDelete(database, userId){
    try{
        //deletes user by id
        let data = await database.collection('Users').deleteOne({_id: userId})
        console.log('User deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Modify user data to database
async function userModify(database, userId, updateData){
    try{
        //modifies user by id
        let data = await database.collection('Users').updateOne({_id: userId}, {$set: updateData})
        console.log('User modified in mongodb')
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {userAdd, userDelete, userModify};