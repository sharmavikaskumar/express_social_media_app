const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req,res)=>{

 let { email, password, username, name, age } = req.body;

 let user = await userModel.findOne({ email });

 if(user) return res.send("User already exists");

 bcrypt.genSalt(10,(err,salt)=>{

    bcrypt.hash(password,salt,async(err,hash)=>{

        let newUser = await userModel.create({
            username,
            email,
            age,
            name,
            password:hash,
            posts:[]
        });

        let token = jwt.sign(
            { email:email, userid:newUser._id },
            "secretkey"
        );

        res.cookie("token",token);

        res.send("User registered successfully");

    });

 });

};

exports.login = async (req,res)=>{

 let {email,password} = req.body;

 let user = await userModel.findOne({email});

 if(!user) return res.send("something went wrong");

 bcrypt.compare(password,user.password,(err,result)=>{

    if(result){

        let token = jwt.sign(
            {email:email,userid:user._id},
            "secretkey"
        );

        res.cookie("token",token);

        res.redirect("/feed");

    }else{
        res.redirect("/login");
    }

 });

};

exports.logout = (req,res)=>{

 res.clearCookie("token");

 res.redirect("/login");

};