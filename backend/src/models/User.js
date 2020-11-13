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
    marketList: [{
        type: Schema.Types.ObjectId,
        ref: 'MarketList',
    }]
}, {
    timestamps: true,
});

module.exports = model('User', UserSchema);
