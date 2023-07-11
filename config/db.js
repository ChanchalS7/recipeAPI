const mongoose = require("mongoose")
const dotenv=require("dotenv")
dotenv.config();
mongoose.set('strictQuery',false);
MONGO_URL=process.env.MONGO_URL||'mongodb://localhost:27017/recipeAPI'
const connectDB= async()=>{
    try{
const conn=await mongoose.connect(MONGO_URL);
console.log(`Database connected successfully`)
    }catch(err){
        console.log(`Error connecting to database: ${err}`)
    }
}
module.exports=connectDB;