const express = require("express")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes =require("./routes/auth.routes")
const recipeRoutes = require("./routes/recipe.routes")
dotenv.config();
const app = express();
//middleware
app.use(express.json())
app.use('/api',authRoutes)
app.use('/',recipeRoutes)
connectDB();
app.get("/",(req,res)=>{
    res.send("<h2>Welcome to the recipe API</h2>")
})
const PORT=process.env.PORT||8081
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})


