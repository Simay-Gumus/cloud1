const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the item schema
const itemSchema = new Schema({
    itemType: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    seller: { type: String },
    image: { type: String },
    batteryLife: { type: String },
    age: { type: Number },
    size: { type: Number },
    material: { type: String },
});

// Pre-delete hook to remove associated comments from users
itemSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        const itemId = this._id; // Get the ID of the item being deleted
        // Remove all comments from User documents where the item field matches the deleted item's ID
        await mongoose.model('User').updateMany(
            { 'comments.item': itemId },
            { $pull: { comments: { item: itemId } } }
        );
        next();
    } catch (error) {
        next(error);
    }
});

// Create the model from the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
