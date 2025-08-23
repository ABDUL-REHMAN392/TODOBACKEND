import jwt from "jsonwebtoken";
export const validation = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token)
    return res.status(400).json({ status: false, message: "please Login" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
};
