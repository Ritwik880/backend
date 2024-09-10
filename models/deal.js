const mongoose = require('mongoose');
const dealSchema = new mongoose.Schema({
    id: {
        type: String,
        default: Math.floor(Math.random() * 100)
    },
    price:{
        type: Number,
        required: true
    },
    itemsAvailable:{
        type: Number,
        required: true
    },
    itemSold:{
        type: Number,
        default: 0
    },
    isActive:{
        type: Boolean,
        default: true,
        required: true
    },
}, {timestamps: true});

const Deal = mongoose.model('Deal', dealSchema);
module.exports = Deal;