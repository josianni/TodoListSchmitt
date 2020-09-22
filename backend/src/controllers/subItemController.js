const Item = require('../models/Item');

module.exports = {

    async store(req, res) {
        const { name } = req.body;
        const { parentid } = req.headers;

        const itemParentList = await Item.findById(parentid);

        if (itemParentList) {
            const listSubItems = itemParentList.items;
            var subItem = null;
            for (i = 0; i < listSubItems.length; i++) {
                subItem = await Item.findOne(itemParentList.items[i]._id);
                if (subItem.name === name) {
                    return res.status(400).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
                }
            }

            const item = await Item.create({
                name,
            });

            itemParentList.items.push(item._id);

            await itemParentList.save();

            return res.json(item);

        } else {
            return res.status(400).json({ error: 'Parent Item List não encontrada' });
        }

    },

    async index(req, res) {
        const { parentid } = req.headers;

        const itemParentList = await Item.findById(parentid);

        if (!itemParentList) {
            return res.status(400).json({ error: "Parent Item List não existe!" });
        }

        const items = await Item.find({ _id: { $in: itemParentList.items } });

        return res.json(items);
    },
};