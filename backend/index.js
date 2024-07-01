require("dotenv").config();

const express = require("express");
const connect = require("./config/Database");
const cors = require('cors');
const UserRoutes = require("./routes/User");
const ProjectRouter = require("./routes/Project");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors({origin:true, credentials:true}));

app.use(express.json());

app.use('/user', UserRoutes);
app.use('/project', ProjectRouter);

app.listen(PORT , async () => {
    await connect();
    console.log(`running at http://localhost:${PORT}`);
});