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

module.exports = {
  validateProjectId
};
