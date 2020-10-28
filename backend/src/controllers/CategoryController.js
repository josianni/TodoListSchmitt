const Category = require('../models/Category');
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

        const categoryExists = await Category.findOne({ name });

        if (categoryExists) {
            return res.status(406).json({ error: 'Este nome já foi utilizado. Escolha outro nome' });
        }

        const category = await Category.create({
            name,
        });

        const userExists = await User.findById(userid);

        if (userExists) {
            userExists.categoryList.push(category._id);

            await userExists.save();
        }

        return res.status(200).json(category);
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

        const categoryList = await Category.find({ _id: { $in: loggedUser.categoryList } })

        return res.status(200).json(categoryList);
    },


    async destroy(req, res) {
        const { categoryid } = req.params;

        if (!categoryid) {
            return res.status(400).json({ error: 'Category id not filled.' });
        }
        const categoryExists = await Category.findById(categoryid);

        if (categoryExists) {
            if (categoryExists.items.length === 0) {

                await Category.findByIdAndDelete(categoryid);
                console.log(categoryExists.items.length === 0);
                return res.status(204).send();
            } else {
                return res.status(406).json({ error: "This Category has items. Delete the items before to delete the Category." });
            }
        } else {
            return res.status(406).json({ error: "Category not found." });
        }
    },
};