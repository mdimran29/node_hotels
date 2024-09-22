const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) =>{
    //first check request headers has authorization or not 
    const authorization = req.headers.authorization
    if(!authorization){
        return res.status(401).json({error: 'Invalid Token'})
    }
    //Extracting teh jwt taken form request header
    const token = req.headers['authorization'].split(' ')[1]
//  not valid
    if(!token){
        return res.status(401).json({error: 'Unauthorized'});
    }
    try{
    //Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    

    //Attach user information to the request object
    req.user = decoded
    next();
    } catch(err){
        console.log(err);
        res.status(401).json({error: 'Invaild token'});
    }
}
    //Function to generate JWT token 
    const generateToken = (userData) =>{
        return jwt.sign({userData}, process.env.JWT_SECRET, {expiresIn: 3000});
    }


module.exports = {jwtAuthMiddleware,generateToken};