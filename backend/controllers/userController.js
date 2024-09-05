// User controller file where all the user/admin functions exists
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


// Get all users present if the database function 
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email
    })
  } else {
    res.status(401)
    throw new Error("User not found");
  }
})

// Update current user profile informations functions

const updateCurrentUserProfile = asyncHandler(async(req, res) => {
  const user= await User.findById(req.user._id);


  // Change user username and email with newly provided username and email else stick with the old ones.
  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    // Change user password with newly provided password else stick with the old one.

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    // In case of succesfful update of user informations save it and respond show user his data else throw a 404 error.

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
   } else {
    res.status(404);
    throw new Error("User not found");
   }


})

// Delete user by Id function

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user');
    }

    await user.deleteOne({ _id: user._id });
    res.json({ message: "User removed"});
  } else {
    res.status(404);
    throw new Error("User not found");
}
});


const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }

})

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id); 

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin
    });

  } else {
    res.status(404);
    throw new Error("User not found");
  }
})

// All the exported functions fron the user controller
export {createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
};