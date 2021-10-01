const Project = require("./projects-model");

async function validateProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      next({ status: 404, message: "project not found" });
    }
  } catch (error) {
    next(error);
  }
}

function validateProject(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      next({ status: 400, message: "missing required field" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

function validateProjectChanges(req, res, next) {
  try {
    console.log(req.body.completed);
    const { name, description, completed } = req.body;
    if (!name || !description || completed === undefined) {
      next({ status: 400, message: "missing required field" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateProjectId,
  validateProject,
  validateProjectChanges
};
