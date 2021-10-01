const express = require("express");
const { validateProjectId, validateProject, validateProjectChanges } = require("./projects-middleware");
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
    res.status(201).json(req.body);
    next();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateProjectId, validateProjectChanges, (req, res, next) => {
  try {
    Projects.update(req.params.id, req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(res.status(200).json({ message: "item deleted" }))
    .catch(next);
});

router.get("/:id/actions", validateProjectId, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
