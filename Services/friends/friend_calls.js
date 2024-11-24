

const friends = require('./friends_services.js')

// ----------------------------------------- Friends -----------------------------------------
module.exports = function(app){
    app.get('/friendsByTag/:tags', async(req, res) =>{
        const tags = req.params.tags;
        let data = await friends.friendsByTag(tags);
        console.log(data, "Freinds by tags");
        return res.send("Freinds searched for by tag");
    })
    app.post('/friendsbyusername', async(req, res) => {
        const id = req.params.userId;
        const username = req.params.username;
        let data = await friends.friendsByUsername(id, username);
        console.log(data, "Friend added");
        return res.send("Friend added by username");
    })
    app.delete('/deletefriend', async(req, res) => {
        console.log(req.body);
        return res.send("Deleted Friend")
    })
}