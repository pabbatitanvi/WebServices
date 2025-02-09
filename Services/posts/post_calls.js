
const {ObjectId} = require('mongodb');
const post = require('./post_services.js')

// ----------------------------------------- Posts -----------------------------------------
module.exports = function(app){
    
    app.post('/createpost', async(req, res) => {
        const addData = req.body
        let data = await post.postAdd(addData)
        console.log(data, "Post data added");
        return res.send("Post created");
    })
    app.delete('/deletepost/:id', async(req, res) => {
        const postId = new ObjectId(req.params.id)
        let data = await post.postDelete(postId);
        console.log(data, "Post deleted");
        return res.send("Post deleted");
    })
    app.put('/modifypost/:id', async(req, res) => {
        const postId = new ObjectId(req.params.id)
        const updateData = req.body
        console.log(updateData, 'Updata data')
        let data = await post.postModify(postId, updateData)
        console.log(data, "Post modified");
        return res.send("Post modified");
    })

    app.get('/getposts', async(req, res) => {
        let data = await post.getPosts();
        console.log(data);
        return res.json(data);
    })

    app.get('/getpostbylocation/:location', async(req, res) => {
        const location = req.params.location
        let data = await post.postByLocation(location)
        console.log("Posts based on inputted location", data);
        // if "data" is empty, return 0
        if(data.length<=0){
            return 0;
        }else{
            return res.json(data);
        }
    })

    app.get('/getpostbytag/:tag', async(req, res) => {
        const tag = req.params.tag
        let data = await post.postByTag(tag)
        console.log(data);
        // if "data" is empty, return 0
        if(data.length<=0){
            return 0;
        }else{
            return res.json(data);
        }
    })

    app.get('/getpostbyuser/:userId', async(req, res) => {
        const users = req.params.userId
        let data = await post.postByUser(users)
        console.log("Posts based on inputted user", data);
        // if "data" is empty, return 0
        if(data.length<=0){
            return 0;
        }else{
            return res.json(data);
        }
    })

    app.get('/getpostinfo/:postid', async(req, res) => {
        const postID = new ObjectId(req.params.postid)
        let data = await post.getPostInfo(postID)
        console.log(data);
        return res.json(data);
    })
}