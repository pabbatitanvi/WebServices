
// ------------------------------------SERVICES RELATED TO LOCATION----------------------------------------------
// Add location to the database
async function locationadd(userob){
    console.log(userob, 'User Object')
    let data = await db.collection('Locations').insertOne(userob, function(err, result) {
        if(err) console.log(err)
        return result
    })
}

module.exports = {locationadd};

/*
async function locationsearch(userob,{testVal = 0, maxNumResults = Number.MAX_SAFE_INTEGER}){

    const cursor = db.collection("Locations").find(
        {
            price: { $lte : testVal},
        }
    ).limit(maxNumResults);

    const results = await cursor.toArray();
    if(results < 0){
        console.log(`Found listing(s) with at most ${testVal} price`);
        results.forEach((result, i) => {
            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   description: ${result.description}`);
            console.log(`   price: ${result.price}`);
        });
    } else {
        console.log(`No listings found with at most ${testVal} price`);
    }

}
*/
// ------------------------------------SERVICES RELATED TO LOCATION----------------------------------------------