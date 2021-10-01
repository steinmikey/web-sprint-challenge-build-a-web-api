// add middlewares here related to actions
const Action = require("./actions-model");

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      next({ status: 404, message: "action not found" });
    }
  } catch (error) {
    next(error);
  }
}

function validateAction(req, res, next) {
  try {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
      next({ status: 400, message: "missing required field" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateActionChanges(req, res, next) {
  try {
    console.log(req.body.completed);
    const { project_id, description, notes, completed } = req.body;
    if (!project_id || !description || !notes || completed === undefined) {
      next({ status: 400, message: "missing required field" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateActionId,
  validateAction,
  validateActionChanges
};
