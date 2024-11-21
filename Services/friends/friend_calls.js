

const friends = require('./friends_services.js')

// ----------------------------------------- Friends -----------------------------------------
module.exports = function(app){
    app.get('/friendsByTag/:tags', async(req, res) =>{
        // console.log(req.body.Friends);
        // console.log("Suggesting friends based on tags");
        // let replyArray = {
        //     "UserID1": "1010",
        //     "UserID2": "1111",
        //     "UserID3": "0001"
        // }
        // return res.json(replyArray);
        const tags = req.params.tags;
        let data = await friends.friendsByTag(tags);
        console.log(data, "Freinds by tags");
        return res.send("Freinds searched for by tag");
    })
    app.post('/friendsbyusername', async(req, res) => {
        console.log(req.body);
        return res.send("Added Friend")
    })
    app.delete('/deletefriend', async(req, res) => {
        console.log(req.body);
        return res.send("Deleted Friend")
    })
}