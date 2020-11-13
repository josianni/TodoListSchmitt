const MarketList = require('../models/MarketList');
const User = require('../models/User');

module.exports = {

    async store(req, res) {

        const { name } = req.body;
        const { userid } = req.headers;

        if (!name) {
            return res.status(400).json({ error: "Parameter name do not informed in the header" });
        }

        if (!userid) {
            return res.status(400).json({ error: "Parameter userid do not informed in the header" });
        }

        const marketListExists = await MarketList.findOne({ name });

        if (marketListExists) {
            return res.status(406).json({ error: 'This name was alread used. Choose another name' });
        }

        const marketList = await MarketList.create({
            name,
        });

        const userExists = await User.findById(userid);

        if (userExists) {
            userExists.marketList.push(marketList._id);

            await userExists.save();
        }

        return res.status(200).json(marketList);
    },

    async index(req, res) {
        const { userid } = req.headers;

        if (!userid) {
            return res.status(400).json({ error: "Parameter userid do not informad in the header" });
        }

        const loggedUser = await User.findById(userid);

        if (!loggedUser) {
            return res.status(406).json({ error: "User do not exists" });
        }

        const marketList = await MarketList.find({ _id: { $in: loggedUser.marketList } })

        return res.status(200).json(marketList);
    },


    async destroy(req, res) {
        const { marketlistid } = req.params;

        if (!marketlistid) {
            return res.status(400).json({ error: 'Parameter marketlistid not filled.' });
        }
        const marketListExists = await MarketList.findById(marketlistid);

        if (marketListExists) {
            if (marketListExists.items.length === 0) {

                await MarketList.findByIdAndDelete(marketlistid);
                console.log(marketListExists.items.length === 0);
                return res.status(204).send();
            } else {
                return res.status(406).json({ error: "This MarketList has items. Delete the items before to delete the MarketList." });
            }
        } else {
            return res.status(406).json({ error: "MarketList not found." });
        }
    },
};