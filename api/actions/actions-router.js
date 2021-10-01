const express = require("express");
const { validateActionId } = require("./actions-middleware");
const Actions = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {});

router.get("/:id", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
