import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const signupUser = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ error: "password did not match" });

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "user name is already exists" });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //adding the random profile pic url using user name
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    //create a new user
    const newUser = new User({
      fullName,
      userName,
      password: hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      //generate jwt token and set into cookie
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        password: newUser.password,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "invalid data " });
    }
  } catch (error) {
    console.log(error.message);
    res.status(501).json({ error: "internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    const isPasswordCorrect = bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: "Invalid password" });

    generateTokenAndSetCookie(user?._id, res);
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      password: user.password,
      gender: user.gender,
      profilepic: user.profilePic,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(501).json({ error: "internal server error" });
  }
};
export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "logot successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error " });
  }
};
