const Project = require("../models/Project");

const getAllProjects = async (req, res) => {
  const search = req.query.search || ""; // Get the query parameter value
  const page = req.query.page || 1;
  const sort = req.query.sort || ""; // Get the sort query parameter value
  const ITEM_PER_PAGE = 7;
  let query = {};
  if (search !== "") {
    query.ProjectName = { $regex: search, $options: "i" };
  }
  try {
    const skip = (page - 1) * ITEM_PER_PAGE;
    let count = await Project.countDocuments(query);

    let sortQuery = {};
    if (sort !== "") {
      const [field, order] = sort.split(":");
      sortQuery[field] = order === "asc" ? 1 : -1;
    }

    const projects = await Project.find(query)
      .sort(sortQuery)
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);

    return res.status(200).json({
      projects,
      pagination: {
        count,
        pageCount,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch projects" });
  }
};

const createProject = async (req, res) => {
  try {
    const payload = req.body;
    const project = new Project(payload);
    await project.save();
    res.json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to create project" });
  }
};

const updateProjectStatusToRunning = async (req, res) => {
  try {
    const updatedData = await updateProjectStatus(req.params.id, "Running");
    res.json(updatedData || { error: "Project not found" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update project status" });
  }
};

const updateProjectStatusToClosed = async (req, res) => {
  try {
    const updatedData = await updateProjectStatus(req.params.id, "Closed");
    res.json(updatedData || { error: "Project not found" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update project status" });
  }
};

const updateProjectStatusToCancelled = async (req, res) => {
  try {
    const updatedData = await updateProjectStatus(req.params.id, "Cancelled");
    res.json(updatedData || { error: "Project not found" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update project status" });
  }
};

const getProjectInfo = async (req, res) => {
  try {
    const totalCount = await Project.countDocuments();
    const canceledCount = await Project.countDocuments({ Status: 'Cancelled' });
    const runningCount = await Project.countDocuments({ Status: 'Running' });
    const closedCount = await Project.countDocuments({ Status: 'Closed' });
    const registeredCount = await Project.countDocuments({ Status: 'Registered' });
    const currentDate = new Date();
    const delayedRunningCount = await Project.countDocuments({
      Status: 'Running',
      EndDate: { $lt: currentDate },
    });
    return res.status(200).json({
      total: totalCount,
      cancel: canceledCount,
      running: runningCount,
      registered: registeredCount,
      closed: closedCount,
      delayedRunning: delayedRunningCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch total projects" });
  }
};

const getDashboardChart = async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$Department",
          registeredCount: { $sum: 1 },
          closedCount: { $sum: { $cond: [{ $eq: ["$Status", "Closed"] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          registeredCount: 1,
          closedCount: 1,
          successPercentage: { $multiply: [{ $divide: ["$closedCount", "$registeredCount"] }, 100] },
        },
      },
    ];

    const departmentStats = await Project.aggregate(pipeline);

    return res.status(200).json(departmentStats);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch department stats" });
  }
};

// Helper function to update project status
async function updateProjectStatus(id, status) {
  return await Project.findByIdAndUpdate(id, { Status: status }, { new: true });
}

module.exports = {
  getAllProjects,
  createProject,
  updateProjectStatusToRunning,
  updateProjectStatusToClosed,
  updateProjectStatusToCancelled,
  getProjectInfo,
  getDashboardChart,
};
