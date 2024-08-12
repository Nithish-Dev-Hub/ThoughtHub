import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModels.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // we are getting the user based on the ID token we have in JWT from the DB exlcuind the password
        req.user = await User.findById(decoded.userId).select('-password');

        next();
    } 
    catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } 
  else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };