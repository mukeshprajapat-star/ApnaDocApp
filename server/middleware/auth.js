import JWT  from "jsonwebtoken"
export const isAuthenticated=async (req,res,next) =>{
    try {
        const token=req.headers["authorization"].split(" ")[1]
        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                res.status(200).send({
                    message:"Auth Failed" ,
                    success:false
                })
            }
            else{
                req.body.userId=decode._id
                return next()
            }
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message:"Auth Failed",
            success:false
        })
        
    }

}