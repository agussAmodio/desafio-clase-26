const express = require("express");
const app = express();
const { Router } = express;
const router = new Router();

const info = {
  tittle: "Informacion",
  args: JSON.stringify(process.argv, null, "\t"),
  so: process.platform,
  version: process.version,
  memory: process.memoryUsage().rss,
  path: process.cwd(),
  processID: process.pid,
  proyectFolder: __dirname,
};

router.get("/", async (req, res) => {
  //res.sendFile(path.resolve(__dirname, "../../public/info.html"));
  res.send(`TITULO: ${info.tittle}, <br>
  ARGS: ${info.args}, <br>
  PLATAFORM: ${info.so}, <br>
  VERSION: ${info.version}, <br>
  MEMORY: ${info.process}, <br>
  PATH: ${info.path}, <br>
  PROCESS ID: ${info.processID}, <br>
  PROYECT FOLDER: ${info.proyectFolder} <br>
  `);
});

module.exports = router;
