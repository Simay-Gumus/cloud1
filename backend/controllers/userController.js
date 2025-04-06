const userService = require("../services/userService");
//const res = require("express/lib/response");
const {updateComments} = require("../services/userService");
//const commentService = require("./userController");
//const itemService = require("../services/itemService");

const createUser = async (req, res) => {
    try{
        console.log("create user requested");
        const newUser= userService.createUser(req.body);
        res.status(201).json({newUser});
    }
    catch(err){
        res.status(500).json({error: err});
    }
}
const deleteUser = async (req, res) => {
    try{
        await userService.deleteUser(req.params.id);
        res.status(201).json({});
    }
    catch(err){
        res.status(500).json({error: err});
    }
}
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.body);
        res.status(200).json({updatedUser});
    }
    catch (err){
        res.status(500).json({error: err});
    }
}
const getUser = async (req, res) => {
    try {
      //  console.log("get user called");
        const user = await userService.getUser(req.params.username);
        //console.log("get user returned");

        res.status(200).json(user);
    }
    catch (err){
        res.status(500).json({error: err});
    }
}

const updateComment = async (req, res) => {
    try {
      //  console.log("updateComment");
      //  console.log(req.body);

        const { Comment } = req.body;
        const username = Comment.username;
        if (!username || !Comment.item || Comment.rating === undefined || !Comment.review) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const result = await updateComments(username, Comment);
       // console.log("result: ");
       // console.log(result);
        if (!result.success) {
            return res.status(400).json({ success: false, message: result.message });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const result = await userService.loginUser(req.body.username, req.body.password);
        if (result.success) {
            res.status(200).json({user: result.user});
        }
        else{
            res.status(500).json({ success: false, message: result.message });
        }
    }
    catch (err){
        res.status(500).json({error: err});
    }
}
const averageRating = async (req, res) => {
    try {
        const avgUser = await userService.getUserAverageRating(req.params.username);
       // console.log("avg: " +typeof (avgUser));
        res.status(200).json(avgUser);
    }
    catch (err){
        res.status(500).json({error: err});
    }
}
const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();

        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
const deleteComment = async (req, res) => {
    try {
        console.log("deleteComment deniyor");
        const username= req.params.username;
        const itemId= req.params.item;
        console.log("deleted user requested, username, itemId" + username + " "+ itemId);
        const result = userService.deleteComment(username, itemId);
        console.log("result bu: " + result);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
}

module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    userLogin,
    averageRating,
    updateComment,
    getUsers,
    deleteComment
}