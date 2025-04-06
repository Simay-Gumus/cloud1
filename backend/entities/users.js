const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    comments: [{
        item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
        rating: Number,
        review: String,
    }]
});


module.exports = mongoose.model("User", userSchema);