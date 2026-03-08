const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

require("./config/db");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");

app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/",authRoutes);
app.use("/",postRoutes);

app.listen(3000, "0.0.0.0",()=>{
 console.log("Server running on port 3000");
});