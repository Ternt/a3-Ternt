const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemData = Schema({
    item_name: String,
    item_desc: String,
    price: Number,
    thumbnail: String,
});

module.exports = mongoose.model('item', ItemData);
