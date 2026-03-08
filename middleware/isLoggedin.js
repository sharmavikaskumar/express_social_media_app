const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){

 let token = req.cookies.token;

 if(!token){
    return res.redirect("/login");
 }

 let data = jwt.verify(token,"secretkey");

 req.user = data;

 next();
}