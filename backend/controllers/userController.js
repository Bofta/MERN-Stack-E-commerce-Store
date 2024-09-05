import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';


// Function to create the user and save it to the database and create a token
const createUser = asyncHandler(async (req, res) => {
   const { username, email, password } = req.body;
 
   if (!username || !email || !password) {
     throw new Error("Please fill all the inputs.");
   }
 
   const userExists = await User.findOne({ email });
   if (userExists) res.status(400).send("User already exists");
 
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const existingUser = new User({ username, email, password: hashedPassword });
 
   try {
     await existingUser.save();
     createToken(res, existingUser._id);
 
     res.status(201).json({
       _id: existingUser._id,
       username: existingUser.username,
       email: existingUser.email,
       isAdmin: existingUser.isAdmin,
     });
   } catch (error) {
     res.status(400);
     throw new Error("Invalid user data");
   }
 });


// Function to Login the user in case if he have correct password and exists in the database and retrive his JWT Token if it exists
 const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   console.log(email);
   console.log(password);

   const existingUser = await User.findOne({ email });

   if (existingUser) { 
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
   

   if (isPasswordValid){
      createToken(res, existingUser._id);

      res.status(201).json({
         _id: existingUser._id,
         username: existingUser.username,
         email: existingUser.email,
         isAdmin: existingUser.isAdmin,
        
       });
       return;
   }
 }
});


// Logout User function 
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt","", {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: "Logged out successfully"});
})


// Get all users function 
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});


export {createUser, loginUser, logoutCurrentUser, getAllUsers};