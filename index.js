const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const { fork } = require("child_process");

const app = express();

//Yargs
const Yargs = require("yargs/yargs");
const yargs = Yargs(process.argv.slice(2));

const serverPort = yargs
  .alias({
    p: "port",
  })
  .default({ port: 8080 }).argv;

//sessions
app.use(
  session({
    cookie: {
      maxAge: 600000,
    },
    secret: "dalerojo",
    resave: false,
    saveUninitialized: false,
    rolling: true,
  })
);

//Midleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes
const chatRoute = require("./src/routes/chat");
app.use("/api/chat", chatRoute);
const ptosTest = require("./src/routes/productosTest");
app.use("/api/productostest", ptosTest);
const login = require("./src/routes/login");
app.use("/api/login", login);
const logout = require("./src/routes/logout");
app.use("/api/logout", logout);
const register = require("./src/routes/register");
app.use("/api/register", register);
const info = require("./src/routes/info");
app.use("/api/info", info);

//Servidor HTTP
const http = require("http");
const server = http.createServer(app);

//Servidor de Socket
const { Server } = require("socket.io");
const io = new Server(server);

io.on("connection", (socket) => {
  socket.emit("render", "");
  socket.on("actualizacion", () => {
    io.sockets.emit("render", "");
  });
});

//pruebas
const CON_CHILD_PROCESS_FORK = !false;
if (CON_CHILD_PROCESS_FORK) {
  let calculo = fork("./numRandom.js");

  let taskId = 0;
  let tasks = {};

  function addTask(data, callback) {
    let id = taskId++;
    calculo.send({ id: id, data: data });
    tasks[id] = callback;
  }

  calculo.on("message", function (message) {
    tasks[message.id](message);
  });

  app.get("/randoms", async (req, res) => {
    addTask(req.query.cant || 1000, (randoms) => {
      res.json(randoms);
    });
  });
} else {
  app.get("/randoms", async (req, res) => {
    res.send('<h2 style="color: orangered;">randoms -> no implementado!</h2>');
  });
}

//Comienzo Servidor
server.listen(serverPort.port, () => {
  console.log(`Server is run on port ${serverPort.port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
