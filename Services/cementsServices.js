
const mongo = require("../Shared/mongo");
const {ObjectId} =require("mongodb");

const service = {

    async get (req,res){
    
        const data = await  mongo.db.collection("cements").find().toArray();
    
        res.send(data);
    },

    async post(req,res){

        if(req.user.userId == "61a09fac1c6421b1f0e67e09"){
         const inserted =   await mongo.db.collection("cements").insertOne(req.body);
         res.send(inserted);
        }
        else{
            res.send("Only admin can post")
        }
        
    },

    async put(req,res){
        if(req.user.userId == "61a09fac1c6421b1f0e67e09"){
            const updated =   await mongo.db.collection("cements").findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{...req.body}});
            res.send(updated);
        }
        else{
               res.send("Only admin can update");
        }
    },

    async delete(req,res){
        try{
         if(req.user.userId == "61a09fac1c6421b1f0e67e09"){
             await mongo.db.collection("cements").deleteOne({_id:ObjectId(req.params.id)});
            res.send({});
        }
        else{
               res.send("Only admin can delete");
        }
     
        }catch(err){
         res.send(err);
        }
         
     }

}

module.exports = service;