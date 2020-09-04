const TodoList = require('../models/TodoList');
const User = require('../models/User');

module.exports = {

    async store(req, res){
        
        const { name } = req.body;
        const { userid } = req.headers;

        const todoListExists = await TodoList.findOne({ name });

        if(todoListExists) {
            return res.status( 400 ).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
        }

        const todoList = await TodoList.create({
            name,
        });

        const userExists = await User.findById( userid );

        if(userExists) {
            userExists.todoList.push( todoList._id );
    
            await userExists.save();
        }
        
        return res.json(todoList);
    },

    async index(req, res){
        const { user } = req.headers;

        const loggedUser = await User.findById( user );

        //Filtrar todos os Todo List do usuário logado
       const todoLists = await TodoList.find({ _id: { $in: loggedUser.todoList } })

        return res.json( todoLists );
    },

};