const express = require("express");
const {
  getAllProjects,
  createProject,
  updateProjectStatusToRunning,
  updateProjectStatusToClosed,
  updateProjectStatusToCancelled,
  getProjectInfo,
  getDashboardChart,
} = require("../controllers/Project")

const ProjectRouter = express.Router();

ProjectRouter.get("/project", getAllProjects);
ProjectRouter.post("/project/create", createProject);
ProjectRouter.patch("/statusrun/:id", updateProjectStatusToRunning);
ProjectRouter.patch("/statusclose/:id", updateProjectStatusToClosed);
ProjectRouter.patch("/statuscancel/:id", updateProjectStatusToCancelled);
ProjectRouter.get("/projectinfo", getProjectInfo);
ProjectRouter.get("/dashboardchart", getDashboardChart);

module.exports = ProjectRouter;
