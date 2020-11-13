const Item = require('../models/Item');

module.exports = {

    async store(req, res) {

        const { itemid } = req.body;

        if (!itemid) {
            return res.status(400).json({ error: 'Parameter itemid not informed' });
        }

        const item = await Item.findById(itemid);

        if (!item) {
            return res.status(406).json({ error: 'Item not found' });
        }

        item.done = !item.done;

        await item.save();

        return res.json(item);
    },

};