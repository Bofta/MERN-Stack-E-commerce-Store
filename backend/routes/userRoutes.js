// User and admin routes page

import express from "express";

import {createUser,
    loginUser,
    logoutCurrentUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
} from '../controllers/userController.js';
import {authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";


// Declaring the express router
const router = express.Router();

// User should be created to > get authenticated, and be an admin to get all users.
router.route("/").post(createUser)
                 .get(authenticate, authorizeAdmin, getAllUsers);

// Route to auth the user/admin
router.post("/auth", loginUser); 
// Route to logout the current User/Admin
router.post("/logout", logoutCurrentUser);
// Route to authenticate the user in order to get the current user profile first
router.route('/profile').get(authenticate, getCurrentUserProfile)
                        .put(authenticate, updateCurrentUserProfile);


// ADMIN ROUTES 🛠️
router.route('/:id').delete(authenticate, authorizeAdmin, deleteUserById)
                    .get(authenticate, authorizeAdmin, getUserById)
                    .put(authenticate, authorizeAdmin, updateUserById);


export default router;