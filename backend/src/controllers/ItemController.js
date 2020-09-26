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

    async destroy(req, res) {
        const { todoListId } = req.params;
        const { itemId } = req.params;

        const todoList = await TodoList.findById(todoListId);
        if (todoList) {
            const todoListItems = todoList.items;

            if (todoListItems) {

                const itemList = await Item.findById(itemId);

                if (itemList) {
                    if (itemList.items.length === 0) {

                        await Item.findByIdAndDelete(itemId);

                        var index = todoListItems.indexOf(itemId);
                        if (index > -1) {
                            todoListItems.splice(index, 1);
                            await todoList.save();
                        }

                        return res.status(200).json({ mensage: "Item deletado" });
                    } else {
                        return res.status(400).json({ error: "Tem sub itens neste Item" });
                    }
                }
            }
            return res.status(400).json({ error: "Id do item não encontrado" });
        }
        return res.status(400).json({ error: "Todo List não encontrada" });
    },
};