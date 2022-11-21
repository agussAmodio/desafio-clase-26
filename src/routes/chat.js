const express = require("express");
const { reset } = require("nodemon");
const Contenedor = require("../daos/chat/ChatDaoFirebase");
const { normalize, schema, denormalize } = require("normalizr");

const app = express();
const { Router } = express;
const router = new Router();

let chat = new Contenedor();

//GET DEL CHAT
router.get("/", (req, res) => {
  async function getTodos() {
    try {
      let aux = await chat.getAll();
      const commentSchema = new schema.Entity("msg");
      const schemaAutor = new schema.Entity("author");
      const mySchema = new schema.Array({
        author: schemaAutor,
        comments: [commentSchema],
      });

      const normalizedChat = normalize(aux, mySchema);

      const denormalizeChat = denormalize(
        normalizedChat.result,
        mySchema,
        normalizedChat.entities
      );

      res.send({
        normalizr: normalizedChat,
        original: aux,
      });
    } catch (error) {
      throw Error("Error en todos los chats");
    }
  }
  getTodos();
});

//POST DEL CHAT
router.post("/", (req, res) => {
  async function saveChat() {
    try {
      await chat.save(req.body);
      console.log("grabo");
      res.send("chat agregado");
    } catch (error) {
      console.log(error);
      throw Error("Error en post Chat");
    }
  }

  saveChat();
});

//EXPORT MODULO ROUTER
module.exports = router;
