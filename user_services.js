
//Add user data to DB
async function userAdd(database, userob){
    console.log(userob, 'User Object')
    try{
        //inserts usr data into the database
        let data = await database.collection('Users').insertOne(userob)
        //returns the id of the data created
        return data.insertedId
    } catch {
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