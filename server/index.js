const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require('dotenv').config();
app.use(cors());
app.use(express.json());

const userAdd = require("./routes/user/userAdd");
const authRoutes = require("./routes/auth/authRoute");
const authController = require("./routes/auth/authcontroller");
const emailCodeController = require("./routes/recoverPass/emailCodeController");
const verifyCodeController = require("./routes/recoverPass/verifyCodeController");
const changePasswordController = require("./routes/recoverPass/changePasswordController");
const fetchUpcomingCampaigns = require("./routes/campaigns/fetchUpcomingCampaigns");
const fetchActiveCampaigns = require("./routes/campaigns/fetchActiveCampaigns");
const fetchFinishedCampaigns = require("./routes/campaigns/fetchFinishedCampaigns");
const fetchCampaigns = require("./routes/campaigns/fetchCampaigns");
const registerVote = require("./routes/votes/registerVote");
const fetchUserInf = require("./routes/user/fetchUserInf");
const userUpdate = require("./routes/user/userUpdate");
const uploadFiles = require("./utils/upload");
const registerCandidate = require("./routes/candidates/RegisterCandidate");
const fetchCampaignAdmin= require("./routes/admin/fetchCampaignAdmin");
const updateCampaignAdmin= require("./routes/admin/updateCampaignAdmin");
const updateCandidateAdmin= require("./routes/admin/updateCandidateAdmin");
const createCampaignAdmin= require("./routes/admin/createCampaignAdmin");
const updateCampaignImageAdmin= require("./routes/admin/updateCampaignImageAdmin");
const deleteCampaignAdmin= require("./routes/admin/deleteCampaignAdmin");
const resultVotes= require("./routes/votes/resultVotes");
const verifyVotes= require("./routes/votes/verifyVotes");
const cursos= require("./utils/course");


//add user
app.use("/", userAdd);
app.use("/", fetchUserInf);
app.use("/", userUpdate);


//login and auth
app.use("/", authRoutes);
app.use("/", authController);

//Recover pass
app.use("/", emailCodeController);
app.use("/", verifyCodeController);
app.use("/", changePasswordController);


//campaigns
app.use("/", fetchUpcomingCampaigns);
app.use("/", fetchActiveCampaigns);
app.use("/", fetchFinishedCampaigns);
app.use("/", fetchCampaigns);


//votes
app.use("/", registerVote);
app.use("/", resultVotes);
app.use("/", verifyVotes);


//uploads files
app.use("/", uploadFiles);


//get cursos

app.use("/", cursos)

//candidates
app.use("/", registerCandidate);


// admin
app.use("/", fetchCampaignAdmin);
app.use("/", createCampaignAdmin);

app.use("/", updateCampaignAdmin);
app.use("/", updateCandidateAdmin);
app.use("/", updateCampaignImageAdmin);

app.use("/", deleteCampaignAdmin);
 




app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(3001, () => {
  console.log("Servidor corriendo en el puerto 3001");
});
