const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const isLoggedIn = require("../middleware/isLoggedin");

router.get("/feed",isLoggedIn,postController.feed);

router.get("/profile",isLoggedIn,postController.profile);
router.post("/post",isLoggedIn,postController.createPost);
router.get("/like/:id",isLoggedIn,postController.likePost);
router.get("/edit/:id",isLoggedIn,postController.editPost);
router.post("/updatepost/:id",isLoggedIn,postController.updatePost);

module.exports = router;