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
// Import necessary dependencies
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const dotenv = require("dotenv")
// const upload = multer({ dest: 'uploads/' });
// dotenv.config();
// // Create the Express app
// const app = express();

// // Set up middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');

//     // Define user schema
//     const userSchema = new mongoose.Schema({
//       name: { type: String, required: true },
//       email: { type: String, required: true, unique: true },
//       password: { type: String, required: true },
//     });

//     // Define recipe schema
//     const recipeSchema = new mongoose.Schema({
//       title: { type: String, required: true },
//       image: { type: String, required: true },
//       price: { type: Number, required: true },
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     });

//     // Define user model
//     const User = mongoose.model('User', userSchema);

//     // Define recipe model
//     const Recipe = mongoose.model('Recipe', recipeSchema);

//     // Register a new user
//     app.post('/api/register', async (req, res) => {
//       try {
//         const { name, email, password } = req.body;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const user = new User({ name, email, password: hashedPassword });
//         await user.save();

//         res.status(201).json({ message: 'User registered successfully.' });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });

//     // Login a user and generate a JWT token
//     app.post('/api/login', async (req, res) => {
//       try {
//         const { email, password } = req.body;

//         // Find the user
//         const user = await User.findOne({ email });

//         if (!user) {
//           return res.status(401).json({ message: 'Invalid email or password.' });
//         }

//         // Compare the password
//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//           return res.status(401).json({ message: 'Invalid email or password.' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

//         res.status(200).json({ token });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });

//     // Create a new recipe
//     app.post('/api/recipes', upload.single('image'), async (req, res) => {
//       try {
//         const { title, price } = req.body;
//         const image = req.file.path;
//         const userId = req.user.userId; // Assuming the token is verified using a middleware

//         // Create a new recipe
//         const recipe = new Recipe({ title, image, price, userId });
//         await recipe.save();

//         res.status(201).json({ message: 'Recipe created successfully.' });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });

//     // Update a recipe
//     app.patch('/api/recipes/:id', async (req, res) => {
//       try {
//         const recipeId = req.params.id;
//         const { title, price } = req.body;
//         const userId = req.user.userId; // Assuming the token is verified using a middleware

//         // Find and update the recipe
//         const recipe = await Recipe.findOneAndUpdate(
//           { _id: recipeId, userId },
//           { title, price }
//         );

//         if (!recipe) {
//           return res.status(404).json({ message: 'Recipe not found or unauthorized to update.' });
//         }

//         res.status(200).json({ message: 'Recipe updated successfully.' });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });

//     // Delete a recipe
//     app.delete('/api/recipes/:id', async (req, res) => {
//       try {
//         const recipeId = req.params.id;
//         const userId = req.user.userId; // Assuming the token is verified using a middleware

//         // Find and delete the recipe
//         const recipe = await Recipe.findOneAndDelete({ _id: recipeId, userId });

//         if (!recipe) {
//           return res.status(404).json({ message: 'Recipe not found or unauthorized to delete.' });
//         }

//         res.status(200).json({ message: 'Recipe deleted successfully.' });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });

//     // Start the server
//     app.listen(3000, () => {
//       console.log('Server running on port 3000');
//     });
//   })
//   .catch((error) => {
//     console.log('Failed to connect to MongoDB:', error);
//   });
