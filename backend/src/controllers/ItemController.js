const TodoList = require('../models/TodoList');
const Item = require('../models/Item');

module.exports = {

    async store(req, res) {

        const { name } = req.body;
        const { todolistid } = req.headers;

        const todoList = await TodoList.findById(todolistid);

        if (todoList) {

            const itemExists = todoList.items.indexOf(name);

            if (itemExists >= 0) {
                return res.status(400).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
            } else {
                const item = await Item.create({
                    name,
                });

                todoList.items.push(item._id);

                await todoList.save();

                return res.json(todoList);
            }
        } else {
            return res.status(400).json({ error: 'Todo List não encontrada' });
        }

    },

    async index(req, res) {
        const { todolistid } = req.headers;

        const todoList = await TodoList.findById(todolistid);

        if (!todoList) {
            return res.status(400).json({ error: "TodoList não existe!" });
        }

        const items = await Item.find({ _id: { $in: todoList.items } });

        return res.json(items);
    },
};