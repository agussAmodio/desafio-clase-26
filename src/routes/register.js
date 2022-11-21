const express = require("express");

const app = express();
const { Router } = express;
const router = new Router();
const passportConfig = require("../passport/passportConfig");

//GET DEL REGISTER
router.get("/", async (req, res) => {});

//POST DEL REGISTER LOCALSIGNUP
router.post(
  "/",
  passportConfig.authenticate("local-signup", {
    successRedirect: "/login.html",
    failureRedirect: "/registerError.html",
  })
);

//EXPORT MODULO ROUTER
module.exports = router;
