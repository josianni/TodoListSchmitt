const TodoList = require('../models/TodoList');
const Item = require('../models/Item');

module.exports = {

    async store(req, res) {
        const { name } = req.body;
        const { todolistid } = req.headers;

        const todoList = await TodoList.findById(todolistid);

        if (todoList) {
            const listItems = todoList.items;
            var itens = null;
            for (i = 0; i < listItems.length; i++) {
                itens = await Item.findOne(todoList.items[i]._id);
                if (itens.name === name) {
                    return res.status(400).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
                }
            }
            const item = await Item.create({
                name,
            });

            todoList.items.push(item._id);

            await todoList.save();

            return res.json(item);

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