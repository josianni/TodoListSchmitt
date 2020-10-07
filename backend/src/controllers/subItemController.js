const Item = require('../models/Item');

module.exports = {

    async store(req, res) {
        const { name } = req.body;
        const { parentid } = req.headers;

        if (!name) {
            return res.status(400).json({ error: "Name não informado" });
        }
        if (!parentid) {
            return res.status(400).json({ error: "ParentId não informado no header" });
        }

        const itemParentList = await Item.findById(parentid);

        if (itemParentList) {
            const listSubItems = itemParentList.items;
            var subItem = null;
            for (i = 0; i < listSubItems.length; i++) {
                subItem = await Item.findOne(itemParentList.items[i]._id);
                if (subItem.name === name) {
                    return res.status(406).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
                }
            }

            const item = await Item.create({
                name,
            });

            itemParentList.items.push(item._id);

            await itemParentList.save();

            return res.json(item);

        } else {
            return res.status(406).json({ error: 'Parent Item List não encontrada' });
        }

    },

    async index(req, res) {
        const { parentid } = req.headers;

        if (!parentid) {
            return res.status(400).json({ error: "ParentId não informado no header" });
        }

        const itemParentList = await Item.findById(parentid);

        if (!itemParentList) {
            return res.status(200).json({ error: "Parent Item List não existe!" });
        }

        const items = await Item.find({ _id: { $in: itemParentList.items } });

        return res.json(items);
    },

    async destroy(req, res) {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: "id não informado" });
        }

        const subList = await Item.findById(id);

        if (subList) {
            if (subList.items.length === 0) {
                await Item.findByIdAndDelete(id);
                subList.items = [];
                return res.status(200).json({ mensage: "SubItens deletado" });
            } else {
                for (i = 0; i < subList.items.length; i++) {
                    subItem = await Item.findByIdAndDelete(subList.items[i]._id);
                }

                subList.items = [];
                return res.status(200).json({ mensage: "SubItens deletados" });
            }
        }
        return res.status(406).json({ error: "Id do item não encontrado" });
    },
};