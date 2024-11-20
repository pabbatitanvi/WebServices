
const user = require('./user_services.js')

module.exports = function(app){

    // ----------------------------------------- User Accounts -----------------------------------------
    app.post('/createuser', async(req, res) => {
        //console.log("database: ", db)
        const addData = req.body    
        console.log(addData, "backend received object from frontend")
        let data=await user.userAdd(addData)
        console.log(data, "USER DATA ADDED")
        res.send("User Created")
    })
    app.put('/modifyuser/:id', async(req, res) => {
        const userId = new ObjectId(req.params.id)
        const updateData = req.body
        console.log(updateData, 'Updata data')
        let data = await user.userModify(db, userId, updateData)
        console.log(data, "User modified");
        return res.send("User modified");
    })
    
    app.delete('/deleteuser/:id', async(req, res) => {
        const userId = new ObjectId(req.params.id)
        let data=await user.userDelete(db, userId);
        console.log(data, "User deleted");
        return res.send("User deleted");
    })
    app.post('/login', async(req, res) => {
        console.log(req.body);
        return res.send("Logged in")
    })
}