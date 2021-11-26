
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongo = require("../Shared/mongo");
const {registerSchema,loginSchema} =require("../Shared/schema");
const {ObjectId} = require("mongodb");
const JWTPASS="aspirin"

const service = {
    async register (req,res){

        try{
    
        const {value,error}=   await registerSchema.validate(req.body); 
        if(error)
        return res.send({error});
        // checking whether email already exists
        const user1 = await mongo.db.collection("users").findOne({email:req.body.email});
        
        if(user1) 
        return res.send("Email Id already registered");
        
        // generating salt
        const salt = await bcrypt.genSalt(10);
        
        // hashing password with salt
        req.body.password = await bcrypt.hash(req.body.password,salt);
    
        // inserting into db
        const data =  await mongo.db.collection("users").insertOne(req.body);
        
        res.send("User registered successfully");
    
        }catch(err){
            res.send(err);
        }
        
    },

    async login(req,res){

        try{
            const {value,error}= await loginSchema.validate(req.body);
            if(error)
            return res.send({error});
    
            const user = await mongo.db.collection("users").findOne({email:req.body.email});
    
        if(!user)
        return res.send("User doesn't exist");
    
        const isValid = await bcrypt.compare(req.body.password,user.password);
    
        console.log(isValid);
        if(isValid){
            const token = await jwt.sign({userId:ObjectId(user._id),email:user.email},JWTPASS);
            
            res.send({token});
    
        }
       else{
        res.send("Password or email is wrong")
       }
    
    
        }catch(err){
            res.send(err);
        }
     
    }



}

module.exports = service;