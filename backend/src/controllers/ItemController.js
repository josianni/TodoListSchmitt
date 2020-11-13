const MarketList = require('../models/MarketList');
const Item = require('../models/Item');

module.exports = {

    async store(req, res) {
        const { name } = req.body;
        const { marketlistid } = req.headers;

        const marketList = await MarketList.findById(marketlistid);

        if (marketList) {
            const listItems = marketList.items;
            var items = null;
            for (i = 0; i < listItems.length; i++) {
                items = await Item.findOne(marketList.items[i]._id);
                if (items.name === name) {
                    return res.json(item);
                }
            }
            const item = await Item.create({
                name,
            });

            marketList.items.push(item._id);

            await marketList.save();

            return res.json(item);

        } else {
            return res.status(400).json({ error: 'MarketList not found.' });
        }
    },

    async index(req, res) {
        const { marketlistid } = req.headers;

        const marketList = await MarketList.findById(marketlistid);

        if (!marketList) {
            return res.status(406).json({ error: "MarketList not found." });
        }

        const items = await Item.find({ _id: { $in: marketList.items } });

        return res.json(items);
    },

    async destroy(req, res) {
        const { marketlistid } = req.params;
        const { itemid } = req.params;

        const marketList = await MarketList.findById(marketlistid);
        if (marketList) {
            const marketListItems = marketList.items;
            if (marketListItems) {
                const itemList = await Item.findById(itemid);
                if (itemList) {
                    const index = marketListItems.indexOf(itemid);
                    marketListItems.splice(index, 1);

                    await Item.findByIdAndDelete(itemid);
                    await marketList.save();

                    return res.status(204).send();
                } else {
                    return res.status(406).json({ error: "Item list not found." });
                }
            } else {
                return res.status(406).json({ error: "Items of MarketList not found." });
            }
        } else {
            return res.status(406).json({ error: "MarketList not found." });
        }
    },
};