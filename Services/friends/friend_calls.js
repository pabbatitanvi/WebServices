

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
        return res.send("Friends searched for by tag");
    })
    app.post('/friendsbyusername/:userId/:username', async(req, res) => {
        const userId = req.params.userId;
        const username = req.params.username;
        let data = await friends.friendsByUsername(userId, username);
        console.log(data, "Friend added");
        return res.send("Friend added by username");
    })
    app.delete('/deletefriend/:userId/:username', async(req, res) => {
        const userId = req.params.userId;
        const username = req.params.username;
        let data = await friends.deleteFriend(userId, username);
        console.log(data, "Friend deleted");
        return res.send("Deleted Friend")
    })
}