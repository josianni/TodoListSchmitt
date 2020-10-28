const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = model('Item', ItemSchema);
