
import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';
//Protected Routes token base
export const requireSignIn = async (req,res,next) =>{
    
    try {
       const token = req.headers.authorization;
       if(!token){
        return
        res.status(401).send({  success: false, message: 'JWT must be provided'});

       }
       const decoded = JWT.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
       console.log(error);
       res.status(401).send({success: false,message:'invalid token'});
    }
};

//admin access
export const isAdmin =async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).send({
                success:false,
                message:'UnAuthorized Access',
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"Error in admin middleware",
        });
        
    }
}
