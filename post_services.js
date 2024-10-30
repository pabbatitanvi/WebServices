
//Add post data to database
async function postAdd(userob, database) {
    console.log(userob, 'User Object')
    try{
        //inserts data into the database
        let data = await db.collection('Posts').insertOne(userob)
        //returns the unique id of the data created
        return data.insertedId
    } catch (err){
        console.error(err)
        throw err
    }
}

//Modify post data to database
async function postModify(postId, updateData){
    try{
        //modifies data using the id
        let data = await db.collection('Posts').updateOne({_id: postId}, {$set: updateData})
        console.log('Post modified in mongodb')
        //return data;
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Delete post data
async function postDelete(postId){
    try{
        //deletes the post data using the id
        let data = await db.collection('Posts').deleteOne({_id: postId})
        console.log('Post deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Get post by location
async function postByLocation(location){
    try{
        //creates an array of all the occurences of the location
        let data = await db.collection('Posts').find({LocationName: location}).toArray()
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Get post by user
async function postByUser(userId){
    try{
        //creates an array of all the occurences of the userId
        let data = await db.collection('Posts').find({_id: userId}).toArray()
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports = {postAdd, postModify, postDelete, postByLocation, postByUser};