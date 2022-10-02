const jwt = require("jsonwebtoken");

const middlewareController = {

    verifyToken: (req,res,next) => {
        const token = req.headers.token;
        if(token){
            //Bearer abcd123
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken,process.env.ACCESS_TOKEN, (err,user)=>{
                if(err){
                    res.status(403).json("Token is not valid");
                }
                else{
                    req.user = user;
                    console.log(user);
                    next();
                }
                
            })
        }
        else{
            res.status(401).json("you are not authenticated");
        }
    },

    verifyTokenAdmin: (req,res,next)=>{
        middlewareController.verifyToken(req,res,()=>{
            if(req.user.admin){
                next();
            }else{
                res.status(403).json("you can not use!!!");
            }
        });
    }
}

module.exports = middlewareController;