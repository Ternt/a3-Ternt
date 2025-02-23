const express   = require('express');
const router    = express();

const util           = require('../util/nodeUtil.cjs');
const { ensureAuth } = require('../util/authUtil.cjs');

const userController = require("../controller/userController.cjs");
const cardController = require("../controller/cardController.cjs");
const controller = require("../controller/cardController.cjs");

router.get('/', (req, res) => {
  util.sendFile( res, util.fromRoot("public/index.html") );
});

router.get('/login', (req, res) => {
  util.sendFile( res, util.fromRoot("public/index.html") );
});

router.get('/signup', (req, res) => {
  util.sendFile(res, util.fromRoot("public/index.html"));
});

router.get('/account', ensureAuth, (req, res) => {
  util.sendFile(res, util.fromRoot("public/index.html"));
});

router.get('/results', ensureAuth, (req, res) => {
  if ( req.session.passport.user.username === "admin" ) {
    util.sendFile( res, util.fromRoot("public/index.html") );
  } else {
    res.redirect('/404');
  }
})

router.get('/data/all', ensureAuth,
    async (req, res) => {
      try {
        let data = [];
        const users = await userController.getAllUsers();
        data.push(users);

        const cards = await cardController.getAllCards();
        data.push(cards);

        res.status(200).send(data);
      } catch (error) {
        console.error(error);
      }
    })

router.post('/data/delete', ensureAuth,
    async (req, res) => {
      try {
        const data = req.body;
        let result;
        switch(data.collection) {
          case 'Users': {
            result = await userController.deleteUser(data)
          } break;
          case 'Cards': {
            result  = await controller.deleteCard(data);
          } break;
        }
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
      }
    })

router.post('/data/change', ensureAuth,
    async (req, res) => {
      try {
        const data = req.body;
        let result;
        switch(data.collection) {
          case 'Users': {
            result = userController.changeUserData(data.field, data.value);
          } break;
          case 'Cards': {
            result = cardController.changeCardData(data.field, data.value);
          } break;
        }
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
      }
    })



module.exports = router;
