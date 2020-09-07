const User = require('../models/User');

module.exports = {

    async store(req, res) {

        const { name, email } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.json(userExists);
        }

        const user = await User.create({
            name,
            email,
        });

        return res.json(user);
    },

    async index(req, res) {

        const users = await User.find();

        return res.json(users);
    },
};