const TodoList = require('../models/TodoList');
const User = require('../models/User');

module.exports = {

    async store(req, res) {

        const { name } = req.body;
        const { userid } = req.headers;

        const todoListExists = await TodoList.findOne({ name });

        if (todoListExists) {
            return res.status(400).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
        }

        const todoList = await TodoList.create({
            name,
        });

        const userExists = await User.findById(userid);

        if (userExists) {
            userExists.todoList.push(todoList._id);

            await userExists.save();
        }

        return res.json(todoList);
    },

    async index(req, res) {
        const { userid } = req.headers;

        const loggedUser = await User.findById(userid);

        if (!loggedUser) {
            return res.status(400).json({ error: "Usuário não existe!" });
        }

        //Filtrar todos os Todo List do usuário logado
        const todoLists = await TodoList.find({ _id: { $in: loggedUser.todoList } })

        return res.json(todoLists);
    },


    async destroy(req, res) {
        const { id } = req.body;

        const todoListExists = await TodoList.findById(id);

        if (todoListExists) {
            if (todoListExists.items.length === 0) {

                await TodoList.findByIdAndDelete(id);
                return res.status(200).json({ mensage: "Todo List deletada" });
            } else {
                return res.status(400).json({ error: "Tem itens nesta Todo List" });
            }
        }
        return res.status(400).json({ error: "Todo List não encontrada" });
    },
};