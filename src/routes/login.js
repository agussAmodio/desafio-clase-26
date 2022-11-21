const express = require("express");
const passportConfig = require("../passport/passportConfig");

const app = express();
const { Router } = express;
const router = new Router();

//GET DEL LOGIN
router.get("/", (req, res) => {
  if (req.user) {
    res.send({
      user: req.user.email,
    });
  } else {
    res.send(false);
  }
});

//POST DEL LOGIN
router.post(
  "/",
  passportConfig.authenticate("local-login", {
    successRedirect: "/index.html",
    failureRedirect: "/loginError.html",
  })
);

//EXPORT MODULO ROUTER
module.exports = router;
