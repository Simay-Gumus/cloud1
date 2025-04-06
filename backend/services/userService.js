const User = require('../entities/users');
const Item = require("../entities/items");
const mongoose = require("mongoose");

const createUser = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
}

const deleteUser = async (id) => {
    return User.findByIdAndDelete(id)
}
const updateUser = async (user) => {
    return User.findByIdAndUpdate(user.id,user);
}
const getUser = async (username) => {
    return User.findOne({ username });
}

const loginUser = async (username, password) => {
    try{
        const user = await User.findOne({ username: username, password: password });

        if (!user) {
            return { success: false, message: 'Invalid username or password' };
        }
        return { success: true, message: 'Login successful', user };
    }
    catch(err){
        console.log(err);
    }

};
const getUsers = async () => {
    return await User.find();
}
const updateComments = async (username, comment) => {

    try {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }
        const existingCommentIndex = user.comments.findIndex(c => c.item.toString() === comment.item.toString());
        if (existingCommentIndex !== -1) {
            user.comments[existingCommentIndex].rating = comment.rating;
            user.comments[existingCommentIndex].review = comment.review;
        } else {
         //   console.log("Prev comments not found");
            const newComment = { item: comment.item, rating: comment.rating, review: comment.review };
           // console.log("newComment", newComment);

            user.comments.push(newComment);
        }

        await User.updateOne({ username }, { comments: user.comments });
        return { success: true, message: 'Comment added/updated successfully', user };
    } catch (error) {
        return { success: false, message: error.message };
    }
};


const getUserAverageRating = async (username) => {
        const result = await User.aggregate([
            { $match: { username } }, // Match the given username
            { $unwind: "$comments" }, // Deconstruct the comments array
            {
                $group: {
                    _id: "$_id",
                    avgRating: { $avg: "$comments.rating" } // Calculate average
                }
            }
        ]);

        return result.length ? result[0].avgRating : 0; // Return average or null if no ratings
};

const deleteComment = async (username,itemId) => {
    const result = await User.updateOne(
        { username },
        { $pull: { comments: { item: new mongoose.Types.ObjectId(itemId) } } }
    );

    if (result.modifiedCount > 0) {
        console.log('Comment deleted successfully');
    } else {
        console.log('No matching comment found');
    }
}



module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    loginUser,
    getUserAverageRating,
    updateComments,
    getUsers,
    deleteComment
}