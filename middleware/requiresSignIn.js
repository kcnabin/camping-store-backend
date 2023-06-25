const jwt = require("jsonwebtoken");
const { getTokenFromRequest } = require("../helper/getTokenFromRequest");

const requiresSignIn = async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return next(new Error("Token not present in header!"));
  }

  try {
    const dToken = await jwt.verify(token, process.env.JWT_KEY);
    req.dToken = dToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new Error("TokenExpiredError"));
    }

    if (error.name === "JsonWebTokenError") {
      return next(new Error("Invalid Token"));
    }

    return next(error);
  }
};

module.exports = { requiresSignIn };
