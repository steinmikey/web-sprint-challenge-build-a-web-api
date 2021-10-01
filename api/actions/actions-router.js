const express = require("express");
const { validateActionId, validateAction, validateActionChanges } = require("./actions-middleware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  try {
    Actions.insert(req.body);
    res.status(201).json(req.body);
    next();
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateActionId, validateActionChanges, (req, res, next) => {
  try {
    Actions.update(req.params.id, req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateActionId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(res.status(200).json({ message: "action deleted" }))
    .catch(next);
});

module.exports = router;
