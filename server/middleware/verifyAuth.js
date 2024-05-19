import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send("Unauthorized");
  try {
    const jwtDecoded = jwt.verify(token, process.env.STRONG_PASSWORD);
    if (jwtDecoded !== undefined) {
      req.user = jwtDecoded;
      next();
    } else {
      return res.status(403).send("Invalid Token");
    }
  } catch (err) {
    console.error(err);
  }
};
