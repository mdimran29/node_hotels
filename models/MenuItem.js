const mongoose = require('mongoose');

const  menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert'],
        required: true
    },
    taste:{
        type: String,
        enum: ['sweet', 'savory', 'spicy', 'bitter'],
        required: true
    },
    is_drink:{
        type: Boolean,
        defalut: false
    },
    ingredienta:{
        type: [String],
        default:[]
    },
    num_sales:{
        type: Number,
        default:0
    }

})

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;