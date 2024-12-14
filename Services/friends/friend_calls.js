

const friends = require('./friends_services.js')

// ----------------------------------------- Friends -----------------------------------------
module.exports = function(app){
    app.get('/friendsbytag', async(req, res) =>{

        var tags;
        // to avoid the function this calls giving an error if you send it a single, non-array item
        if(Object.keys(req.query).length <= 1){
            tags = new Array(req.query.tags);
        } else {
            tags = req.query.tags
        }
        
        console.log("query.tags.length:", Object.keys(req.query).length, "TAGS: ", tags)
        let data = await friends.friendsByTag(tags);
        console.log(data, "Friends by tags");
        return res.json(data);
    })
    // Adds a friend to the user with id "userId" by receiving a username and assigning the user with that username to be in
    //the "friends" array of the user with id "userId"
    //AKA: userId should be the userId of the currently logged in user, username should be the username of the friend to be added
    app.post('/friendsbyusername/:userId/:username', async(req, res) => {
        const userId = req.params.userId;
        const username = req.params.username;
        let data = await friends.friendsByUsername(userId, username);
        console.log(data, "Friend added");
        return res.send("");// blank because it gives you an error (that doesn't really do anything) whenever there's any text in here
    })
    // Enter the userId of the currently logged in user and the username of the friend to remove
    app.delete('/deletefriend/:userId/:username', async(req, res) => {
        const userId = req.params.userId;
        const username = req.params.username;
        let data = await friends.deleteFriend(userId, username);
        console.log(data, "Friend deleted");
        return res.send("")
    })
}