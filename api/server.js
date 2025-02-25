const express = require("express");

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

const server = express();
server.use(express.json());

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

server.use(errorHandling);

module.exports = server;

function errorHandling(err, req, res, _next) {
  res.status(err.status || 500).json({
    message: err.message || "server error"
  });
}
