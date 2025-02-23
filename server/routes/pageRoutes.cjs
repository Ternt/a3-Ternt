const express   = require('express');
const router    = express();

const util           = require('../util/nodeUtil.cjs');
const { ensureAuth } = require('../util/authUtil.cjs');

const userController = require("../controller/userController.cjs");

router.get('/', (req, res) => {
  util.sendFile( res, util.fromRoot("public/index.html") );
});

router.get('/login', (req, res) => {
  util.sendFile( res, util.fromRoot("public/index.html") );
});

router.get('/signup', (req, res) => {
  util.sendFile( res, util.fromRoot("public/index.html") );
});

router.get('/results', ensureAuth, (req, res) => {
  if ( req.session.passport.user.username === "admin" ) {
    util.sendFile( res, util.fromRoot("public/index.html") );
  } else {
    res.redirect('/404');
  }
})

router.get('/data/all', ensureAuth, (req, res) => {
  try {
    let data = [];
    userController.getAllUsers().then((result) => {
      data.push(result);
      res.status(200).send(data);
    })

  } catch (error) {
    console.error(error);
  }
})

module.exports = router;
