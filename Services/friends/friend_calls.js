
/*
      Friend services are not fully developed or "fleshed out" at all at this time, since it is of a significantly lower priority than connecting all other services to
    the front end.
*/

const post = require('./post_services.js')

// ----------------------------------------- Friends -----------------------------------------
module.exports = function(app){
    app.get('/friendsbytag', async(req, res) =>{
        console.log(req.body.Friends);
        console.log("Suggesting friends based on tags");
        let replyArray = {
            "UserID1": "1010",
            "UserID2": "1111",
            "UserID3": "0001"
        }
        return res.json(replyArray);
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