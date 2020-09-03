const {Schema, model} = require ('mongoose');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    todoList: [{
        type: Schema.Types.ObjectId,
        ref: 'TodoList',
    }]
},{
    timestamps: true,
});

module.exports = model('User', UserSchema);
