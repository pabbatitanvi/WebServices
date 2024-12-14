
const {ObjectId} = require('mongodb');
const user = require('./user_services.js')
// ----------------------------------------- User Accounts -----------------------------------------
module.exports = function(app){

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
        let data = await user.userModify(userId, updateData)
        console.log(data, "User modified");
        return res.send("User modified");
    })
    
    app.delete('/deleteuser/:id', async(req, res) => {
        const userId = new ObjectId(req.params.id)
        let data=await user.userDelete(userId);
        console.log(data, "User deleted");
        return res.send("User deleted");
    })
    app.post('/userlogin', async(req, res) => {
        
        let data=await user.userFind(req.body.username)
        if(data.username==req.body.username && data.password==req.body.password)
            return res.send(JSON.stringify(data));
        else
            return res.send("Invalid credentials")
            
    })
    app.get('/getusers', async(req, res) => {
        let data = await user.getUser();
        console.log(data);
        return res.json(data);
    })
    app.get('/getuserbyname/:name', async(req, res) => {
        const name = req.params.name;
        let data = await user.userByName(name);
        console.log(data, "Users by name");
        return res.json(data);
    })
    app.get('/getuserbyid/:id', async(req,res) => {
        const id = new ObjectId(req.params.id);
        let data = await user.userById(id);
        console.log(data, "Users by id", id);
        return res.json(data);
    })

}