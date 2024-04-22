const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken && !refreshToken) {
    return res.status(401).json("Access Denied. No token provided.");
  }

  //const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    if (!refreshToken) {
      return res.status(401).json("Access Denied. No refresh token provided.");
    }
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    const accessToken = jwt.sign(
      { user: decoded.user },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1y" }
    );

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .header("Authorization", accessToken)
      .json(decoded.user);
  } catch (error) {
    return res.status(400).json('Invalid Token.');

  }
}

module.exports = verifyToken;
