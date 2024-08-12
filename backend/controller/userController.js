import User from "../models/userModels.js";
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateWebToken.js"

const userLogin = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
        });
    } 
    else {
      res.status(400);
      throw new Error('Invalid Email and Password');
    }
});

const userLogout = (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/'
    });
    res.status(200).json({ message: 'User Logged Out' });
}

const userRegistration = asyncHandler(async (req, res) => {
      const { name, phone, email, password } = req.body;
    
      const userExists = await User.findOne({ email });
    
      if (userExists) {
        res.status(400);
        throw new Error('User already exists');
      }
      
      const user = await User.create({
        name,
        phone,
        email,
        password,
      });
    
      if (user) {
        generateToken(res, user._id);
        res.status(201).json({
          _id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
        });
      } 
      else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    });

const getUserData = asyncHandler(async (req, res) => {
    if (req.user) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        phone: req.user.phone,
        email: req.user.email,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
});

const updateUserData = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        email: updatedUser.email,
      });
    } 
    else {
      res.status(404);
      throw new Error('User not found');
    }
});

export {
    userLogin,
    userLogout,
    userRegistration,
    getUserData,
    updateUserData
};