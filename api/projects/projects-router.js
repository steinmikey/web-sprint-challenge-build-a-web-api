const express = require("express");
const { validateProjectId, validateProject } = require("./projects-middleware");
const Projects = require("./projects-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  try {
    Projects.insert(req.body);
    res.json(req.body);
    next();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateProjectId, validateProject, (req, res) => {
  try {
    Projects.update();
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res) => {});

router.get("/:id/actions", (req, res) => {});

module.exports = router;
