const TodoList = require('../models/TodoList');
const User = require('../models/User');

module.exports = {

    async store(req, res) {

        const { name } = req.body;
        const { userid } = req.headers;

        if (!name) {
            return res.status(400).json({ error: "Name para Todo List não informado" });
        }

        if (!userid) {
            return res.status(400).json({ error: "userid não informado no header" });
        }

        const todoListExists = await TodoList.findOne({ name });

        if (todoListExists) {
            return res.status(406).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
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

        if (!userid) {
            return res.status(400).json({ error: "userid não informado no header" });
        }

        const loggedUser = await User.findById(userid);

        if (!loggedUser) {
            return res.status(406).json({ error: "Usuário não existe!" });
        }

        //Filtrar todos os Todo List do usuário logado
        const todoLists = await TodoList.find({ _id: { $in: loggedUser.todoList } })

        return res.json(todoLists);
    },


    async destroy(req, res) {
        const { todoListId } = req.params;

        if (!todoListId) {
            return res.status(400).json({ error: 'Parametro todoListId não informado' });
        }

        const todoListExists = await TodoList.findById(todoListId);

        if (todoListExists) {
            if (todoListExists.items.length === 0) {

                await TodoList.findByIdAndDelete(todoListId);
                console.log(todoListExists.items.length === 0);
                return res.status(204).json({ mensage: "Todo List deletada" });
            } else {
                console.log(todoListExists.items.length === 0);
                return res.status(406).json({ error: "Tem itens nesta Todo List" });
            }
        }
        return res.status(406).json({ error: "Todo List não encontrada" });
    },
};