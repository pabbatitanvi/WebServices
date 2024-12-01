
const {ObjectId} = require('mongodb');
const org = require('./organization_services.js')

// ----------------------------------------- Organizations -----------------------------------------
module.exports = function(app){

    //Create orgnizations[Add to DB]
    app.post('/createorganization', async(req, res) => {
        let data=await org.organizationAdd(req.body)
        console.log(data, "USER DATA ADDED")
        return res.send("Organization created")
    })

    //Modify organizations[Update in DB]
    app.post('/modifyorganization/:id', async(req, res) => {
        const orgId = new ObjectId(req.params.id)
        const updateData = req.body
        console.log(updateData, 'Updata data')
        let data = await org.org(ModifyorgId, updateData)
        console.log(data, "Org modified");
        return res.send("Org modified");
    })

    //Delete organization from DB
    app.delete('/deleteorg/:id', async(req, res) => {
        const orgId = new ObjectId(req.params.id)
        let data=await org.orgDelete(orgId);
        console.log(data, "Org deleted");
        return res.send("Org deleted");
    })

    //Find all organizations with a certain tag
    app.get('/getorgbytag/:tag', async(req, res) => {
        const orgtag = req.params.tag
        let data = await org.orgByTag(orgtag)
        console.log("Orgs based on selected tag", data);
        return res.send("Information is displayed");
    })

    app.post('/orglogin', async(req, res) => {
        console.log(req.body.username)
        let data=await org.orgFind(req.body.username)
        console.log(data)
        if(data.username==req.body.username && data.password==req.body.password)
            return res.send(JSON.stringify(data));
        else
            return res.send("Invalid credentials")
       
            
            
    })

}