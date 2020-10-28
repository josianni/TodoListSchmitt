const Category = require('../models/Category');
const Item = require('../models/Item');

module.exports = {

    async store(req, res) {
        const { name } = req.body;
        const { categoryid } = req.headers;

        const category = await Category.findById(categoryid);

        if (category) {
            const listItems = category.items;
            var items = null;
            for (i = 0; i < listItems.length; i++) {
                items = await Item.findOne(category.items[i]._id);
                if (items.name === name) {
                    return res.json(item);
                }
            }
            const item = await Item.create({
                name,
            });

            category.items.push(item._id);

            await category.save();

            return res.json(item);

        } else {
            return res.status(400).json({ error: 'Category not found.' });
        }
    },

    async index(req, res) {
        const { categoryid } = req.headers;

        const category = await Category.findById(categoryid);

        if (!category) {
            return res.status(406).json({ error: "Category not found." });
        }

        const items = await Item.find({ _id: { $in: category.items } });

        return res.json(items);
    },

    async destroy(req, res) {
        const { categoryid } = req.params;
        const { itemid } = req.params;

        const category = await Category.findById(categoryid);
        if (category) {
            const categoryItems = category.items;
            if (categoryItems) {
                const itemList = await Item.findById(itemid);
                if (itemList) {
                    const index = categoryItems.indexOf(itemid);
                    categoryItems.splice(index, 1);

                    await Item.findByIdAndDelete(itemid);
                    await category.save();

                    return res.status(204).send();
                } else {
                    return res.status(406).json({ error: "Item list not found." });
                }
            } else {
                return res.status(406).json({ error: "Items of Category not found." });
            }
        } else {
            return res.status(406).json({ error: "Category not found." });
        }
    },
};