const userModel = require("../models/user");
const postModel = require("../models/post");

exports.profile = async (req,res)=>{

 let user = await userModel
 .findOne({email:req.user.email})
 .populate("posts");

 res.render("profile",{user});

};

exports.createPost = async (req,res)=>{

 let user = await userModel.findOne({email:req.user.email});

 let post = await postModel.create({
  user:user._id,
  content:req.body.content
 });

 user.posts.push(post._id);

 await user.save();

 res.redirect("/profile");

};

exports.searchUser = async (req,res)=>{

   let query = req.query.q;

   let users = await userModel.find({
      username: { $regex: query, $options: "i" }
   }).limit(5);

   res.json(users);
};


exports.likePost = async (req,res)=>{

 let post = await postModel.findById(req.params.id);

 let index = post.likes.indexOf(req.user.userid);

 if(index === -1){
    post.likes.push(req.user.userid);
 }else{
    post.likes.splice(index,1);
 }

 await post.save();

 res.redirect("/feed");

};

exports.editPost = async (req,res)=>{

 let post = await postModel.findById(req.params.id);

 res.render("edit",{post});

};

exports.updatePost = async (req,res)=>{

 await postModel.findByIdAndUpdate(
    req.params.id,
    {content:req.body.content}
 );

 res.redirect("/profile");

};

exports.feed = async (req,res)=>{

 let user = await userModel.findOne({email:req.user.email});

 let posts = await postModel
              .find()
              .populate("user")
              .sort({date:-1});

 res.render("feed",{user,posts});

};