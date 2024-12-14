/*
    Steps to re-set the functions of a re-oranized file:
    1. remove parameter "database" from the function
    2. add line "_database = mongodb.getDb().collection('Users')" to file
    3. rename database call with the private variable (change all "database"s to "_database")
    4. remove the ".collection" part of all old database calls
    4. go to service file (user_calls in this case) and remove the call to the parameter
*/


const mongodb = require('../database.js');

//Add user data to DB
async function userAdd(userob){

    _database = mongodb.getDb().collection('Users')

    console.log(userob, "Data receivved from services.js")
    try{
        //inserts user data into the database
        let data = await _database.insertOne(userob)
        //returns the id of the data created
        return data.insertedId
    } catch(err) {
        console.error(err)
        throw err
    }
}

///Delete user data
async function userDelete(userId){

    _database = mongodb.getDb().collection('Users')
    try{
        //deletes user by id
        let data = await _database.deleteOne({_id: userId})
        console.log('User deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Modify user data to database
async function userModify(userId, updateData){

    _database = mongodb.getDb().collection('Users')
    try{
        //modifies user by id
        let data = await _database.updateOne({_id: userId}, {$set: updateData})
        console.log('User modified in mongodb')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Find users by username for validation
async function userFind(userName){
    
    _database =  mongodb.getDb().collection('Users')
    try{
        let data = await _database.findOne({username: userName})
    
        return data;
    } catch(err){
        console.log(err)
        throw err;
    }
}
async function getUser(){
    _database = mongodb.getDb().collection('Users')
    let data = await _database.find().toArray()
    return data
}
async function userByName(name){
    _database = mongodb.getDb().collection('Users')
    try{
        const names = new RegExp(name, 'i')
        let data = await _database.find({username: {$regex: names}}).toArray()
        return data
    }catch(err){
        console.error(err)
        throw err
    }
}

// Return the details of a user by id
async function userById(userId){
    _database = mongodb.getDb().collection('Users')
    try{
        let data = await _database.findOne({_id: userId})
        return JSON.stringify(data)
    }catch(err){
        console.error(err)
        throw err
    }
}

module.exports = {userAdd, userDelete, userModify, userFind, getUser, userByName, userById};