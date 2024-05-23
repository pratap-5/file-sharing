import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //it will prevent from css attack(Cross Origin Scripting Attack)
    sameSite: "strict", //it will prevent from crfs attack
    secure: process.env.MODE_ENV !== "devlopment",
  });
};

export default generateTokenAndSetCookie;
