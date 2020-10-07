const Item = require('../models/Item');

module.exports = {

    async store(req, res) {

        const { itemid } = req.body;

        if (!itemid) {
            return res.status(400).json({ error: 'Item Id não informado!' });
        }

        const item = await Item.findById(itemid);

        if (!item) {
            return res.status(200).json({ error: 'Item não encontrado!' });
        }

        item.done = !item.done;

        await item.save();

        return res.json(item);
    },

};