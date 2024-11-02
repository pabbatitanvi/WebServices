async function organizationAdd(database, userob){
    console.log(userob,'User Object')
    let data = await database.collection('Organizations').insertOne(userob, function(err, result) {
        if(err) console.log(err)
        return result
    })
}

async function orgModify(database, orgId, updateData){
    try{
        //modifies user by id
        let data = await database.collection('Organizations').updateOne({_id: orgId}, {$set: updateData})
        console.log('Org modified in mongodb')
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function orgDelete(database, orgId){
    try{
        //deletes user by id
        let data = await database.collection('Organizations').deleteOne({_id: orgId})
        console.log('Org deleted')
    } catch (err) {
        console.error(err)
        throw err
    }
}

async function orgByTag(database, orgTag){
    try{
        //creates an array of all the occurences of the userId
        let data = await database.collection('Organizations').find({Tag: orgTag}).toArray()
        return data
    } catch (err) {
        console.error(err)
        throw err
    }
}

module.exports={organizationAdd, orgModify, orgDelete}