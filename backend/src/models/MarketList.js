const { Schema, model } = require('mongoose');

const MarketListSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }]
}, {
    timestamps: true,
});

module.exports = model('MarketList', MarketListSchema);
