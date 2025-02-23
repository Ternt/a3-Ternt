const express   = require('express');
const router    = express();

const controller     = require('../controller/cardController.cjs');
const { ensureAuth } = require('../util/authUtil.cjs');

router.post('/add', ensureAuth,
    async (req, res) => {
        try {
            const data = req.body;
            const result = await controller.addCardToUser(req.session.passport.user, data);
            res.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    })


router.get('/get_user_cards', ensureAuth,
    async (req, res) => {
        try {
            const result = await controller.getAllUserCards(req.session.passport.user);
            res.status(200).send(result);
        } catch (error) {
            console.error(error);
        }
    })

module.exports = router;