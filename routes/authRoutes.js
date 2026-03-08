const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Home page
router.get("/", (req,res)=>{
    res.render("index");
});

// Login page
router.get("/login",(req,res)=>{
    res.render("login");
});

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

// Logout
router.get("/logout", authController.logout);

module.exports = router;