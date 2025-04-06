const Item = require('../entities/items');
const User = require('../entities/users');
const mongoose = require('mongoose');

const createItem = async (item) => {
    const newItem = new Item(item);
    return await newItem.save();
}

const updateItem = async (item) => {
    return Item.findByIdAndUpdate(item.id, item);
}

const deleteItem = async (id) => {
    const item = await Item.findById(id);
    if (item) {
        await item.deleteOne(); // This triggers the pre('deleteOne') hook
    }
}


const getItem = async (id) => {
    return Item.findById(id);
}

const getItems = async () => {
    return await Item.find();
}
/*
const deleteComment = async (username, itemId) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return { success: false, status: 404, message: 'User not found' };
        }

        // Find the index of the comment that matches the itemId and review
        const commentIndex = user.comments.findIndex(comment =>
            comment.username.toString() === itemId
        );

        if (commentIndex === -1) {
            return { success: false, status: 404, message: 'Comment not found' };
        }

        // Remove the comment from the user's comments array
        user.comments.splice(commentIndex, 1);

        // Save the updated user document
        await User.updateOne({ username }, { comments: user.comments });

        return { success: true };
    } catch (error) {
        console.error(error);
        throw new Error('Server error');
    }
};
*/

const getCommentsByItemId = async (itemId) => {
    try {
        const results = await User.aggregate([
            {
                $unwind: '$comments'  // Deconstruct the comments array to treat each comment as a separate document
            },
            {
                $match: { 'comments.item': new mongoose.Types.ObjectId(itemId) }  // Match comments with the given itemId
            },
            {
                $project: {
                    username: 1,  // Include the username in the result
                    comment: '$comments'  // Include the matched comment
                }
            }
        ]);
        //console.log("results:");
       // console.log(results);
        // Return the results directly
        return results.map(user => ({
            item: user.comment.item.toString(), // Convert ObjectId to string
            username: user.username,
            review: user.comment.review,
            rating: user.comment.rating
        }));
    } catch (err) {
       // console.log("error:");

       // console.error(err);
        throw err;
    }
};
const getAverageRating = async (item) => {
    const result = await User.aggregate([
        { $unwind: "$comments" }, // Flatten the comments array
        { $match: { "comments.item": new mongoose.Types.ObjectId(item) } }, // Filter by itemId
        {
            $group: {
                _id: "$comments.item",
                averageRating: { $avg: "$comments.rating" } // Compute average
            }
        }
    ]);

    return result.length > 0 ? result[0].averageRating : 0;
};

const getItemsByCategory = async (itemType) => {
    return await Item.find({ itemType });
};




module.exports = {
    createItem,
    updateItem,
    deleteItem,
    getItem,
    getItems,
    getCommentsByItemId,
    getAverageRating,
    getItemsByCategory,
  //  deleteComment
}