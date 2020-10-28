const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    categoryList: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }]
}, {
    timestamps: true,
});

module.exports = model('User', UserSchema);
