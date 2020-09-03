const {Schema, model} = require ('mongoose');

const ItemSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    done:{
        type: Boolean,
        required: false,
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item',
    }]
},{
    timestamps: true,
});

module.exports = model('Item', ItemSchema);
