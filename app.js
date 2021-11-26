require('dotenv').config()

const express = require("express");

const mongo = require("./Shared/mongo");
const jwt = require("jsonwebtoken");
const usersRoutes = require("./Routes/usersRoutes");
const cementsRoutes = require("./Routes/cementsRoutes");

const JWTPASS="aspirin"
const cors = require("cors");



try{
    (async function(){

    await mongo.connect();

    const app = express();

    app.use(cors());
    
    app.use(express.json());

    // Logging Middleware
    app.use((req,res,next)=>{
        console.log("Logging middleware running");
        next();
    })

    app.use("/users",usersRoutes);

    // Token Authorization Middleware

    app.use(async(req,res,next)=>{
        
        
        const token = req.headers["authtoken"];
        
        if(!token)
        return res.send("Please login to get access ");

        try{
        
        const user = await jwt.verify(token,JWTPASS);
        req.user = user; 
        next();

        }
        

        catch(err){
            res.send(err);
        }
        
    });

    app.use("/cements",cementsRoutes);

    app.listen(process.env.PORT,()=>{
        console.log(`Server running in the port ${process.env.PORT}`);
    })
    })();

}catch(err){
    console.log(err);
    
}

