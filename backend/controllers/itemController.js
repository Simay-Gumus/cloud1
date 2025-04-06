const itemService = require("../services/itemService");
const res = require("express/lib/response");

const createItem = async (req, res) => {
    try{


        const newItem = itemService.createItem(req.body.item);
      //  console.log("4:" + newItem);
        res.status(201).json({newItem});
    }
    catch(err){
        res.status(500).json({error: err});
    }
}

const deleteItem = async (req, res) => {
    try {
        await itemService.deleteItem(req.params.id);
        res.status(204).json();
    }
    catch(err){
        res.status(500).json({error: err});
    }
}
const getItems = async (req, res) => {
    try {
        const items = await itemService.getItems();
        res.status(200).json(items);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const getItem = async (req, res) => {
    try {
        const item = await itemService.getItem(req.params.id);
        res.status(200).json(item);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

const updateItem = async (req, res) => {
    try{
        const updatedItem = await itemService.updateItem(req.body);
        res.status(200).json(updatedItem);
    }
    catch (err){
        res.status(500).json({error: err});
    }
}
const getCommentsByItemId = async (req, res) => {
   // console.log("In comments get controller");
    try {
        const comments = await itemService.getCommentsByItemId(req.params.id);
        //console.log(comments);
        res.status(200).json(comments);
    }
    catch (err){
        res.status(500).json({error: err});
    }
}
const getAverageRating = async (req, res) => {
    try {
        const averageRate = await itemService.getAverageRating(req.params.id);
        //console.log("item average",typeof (averageRate));
        res.status(200).json(averageRate);
    }
    catch (err){
        res.status(500).json({error: err});
    }
}
const getItemsByCategory = async (req, res) => {
    try {
        const items = await itemService.getItemsByCategory(req.params.itemType);
        if(items.length > 0){
            res.status(200).json(items);
        }
        else {
            res.status(404).json({ message: "No items found for this category" });
        }
    }
    catch (err){
        res.status(500).json({error: err});
    }
}
/*
const deleteComment = async (req, res) => {
    const { username, item } = req.params;
    console.log("delete comment requested, username, item" + username + " " + item);

    try {
        const result = await itemService.deleteComment(username, item);

        if (result.success) {
            return res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            return res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
*/
module.exports = {
    createItem,
    deleteItem,
    getItems,
    updateItem,
    getItem,
    getCommentsByItemId,
    getAverageRating,
    getItemsByCategory,
   // deleteComment
}