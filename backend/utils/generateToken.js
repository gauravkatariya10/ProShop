import jwt from "jsonwebtoken";

const generateToken = (res, id) => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });

  //set JWT as HTTP-only cookie

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 20 * 24 * 60 * 60 * 1000,
    // maxAge: 10000,
  });
};
export default generateToken;
