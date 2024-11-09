
//Add post data to database
async function postAdd(database, userob) {
    console.log(userob, 'User Object')
    try{
        //inserts data into the database
        let data = await database.collection('Posts').insertOne(userob)
        //returns the unique id of the data created
        return data.insertedId
    } catch (err){
        console.error(err)
        throw err
    }
}

//Modify post data to database
async function postModify(database, postId, updateData){
    try{
        //modifies data using the id
        let data = await database.collection('Posts').updateOne({_id: postId}, {$set: updateData})
        console.log('Post modified in mongodb')
        //return data;
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Delete post data
async function postDelete(database, postId){
    try{
        //deletes the post data using the id
        let data = await database.collection('Posts').deleteOne({_id: postId})
        console.log('Post deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Get post by location
async function postByLocation(database, location){
    try{
        //creates an array of all the occurences of the location
        let data = await database.collection('Posts').find({LocationName: location}).toArray()
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

//Get post by user
async function postByUser(database, userId){
    try{
        //creates an array of all the occurences of the userId
        let data = await database.collection('Posts').find({UserId: userId}).toArray()
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function postByTag(database, tag, maxNumResults = Number.MAX_SAFE_INTEGER){
    
    cursor = database.collection("Posts").find(
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
    } else {
        console.log(`No listings found with tag ${tag} (or something went wrong)`);
        console.log(`results : ${results}`);
        console.log(`search values : ${tag}`)
    }
}

module.exports = {postAdd, postModify, postDelete, postByLocation, postByUser, postByTag};