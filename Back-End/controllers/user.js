import generateToken from "../middlewre/GenerateToke.js";
import {User} from "./../models/user.js";
import bcrypt from "bcryptjs";





//Registration function


export const register = async (req, res) => {
  // getting the data from the request
  const UserData = req.body;

  try {
    // cheaking if the user already exists
    const existingUser = await User.findOne({ email: UserData.email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email" });
    }

    const newUser = await User.create(UserData);

    const token = generateToken(newUser._id);
    console.log("Token generated:", token);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: "Registered", user: newUser, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};
   


//Login Funciton 


 
export const login = async (req, res) => {
  // getting the data from the request
  const { email, password } = req.body;

  try {
    // checking if the user exists
    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      return res
        .status(401)
        .json({ message: "Invalid credentials, User not found" });
    }
    bcrypt.compare(password, findUser.password, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ message: err.message || "Internal Server Error" });
      }

      if (!result) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate token
      const token = generateToken(findUser._id);


      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ message: "Login successful", user: findUser, token });
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};


// getting the user by id



// controllers/userController.js
export const getProfile = async (req, res) => {
  try {
    // 1. Grab the ID placed on req by your auth middleware
    const userId = req.user._id;   // adjust if your middleware uses req.userId
  console.log("User ID from middleware:", userId);
  
    // 2. Query the DB, omitting password & __v
    const user = await User.findById(userId).select('-password -__v');
    console.log("User found:", user);
    
    // 3. Handle “not found”
    if (!user) return res.status(404).json({ message: 'User not found' });

    // 4. Success
    res.status(200).json(user);
  } catch (err) {
    next(err);      // let your global error handler format the response
  }
};
