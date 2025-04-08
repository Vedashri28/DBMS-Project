const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require("./app/routes/userRoutes");
const leaveRouter = require("./app/routes/leaveRoutes"); // Ensure this is correctly imported
app.use(express.json());
dotenv.config();
const cors= require("cors");
app.use(cors()); // Ensure CORS is enabled
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/leave", leaveRouter); // Ensure this is correctly registered

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("mongodb connected");
    app.listen(process.env.PORT, () => {
        console.log("server is running on port : " + process.env.PORT)
    })
})
.catch((err) => console.log(err));