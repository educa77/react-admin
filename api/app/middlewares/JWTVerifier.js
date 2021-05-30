require("dotenv").config();
const jwt = require("jsonwebtoken");
//1 día = 86400000

const secret = process.env.JWT_SECRET;

async function JWTVerifier(req, res, next) {
  console.log(req.headers, "req.headers de jwt");
  const token = req.headers["x-access-token"];
  console.log(token, "token");
  if (!token)
    return res
      .status(422)
      .send({ auth: false, message: "No token provided!!" });
  await jwt.verify(token, secret, async (err, decoded) => {
    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }
    req.userId = decoded.id;
    req.token = token;
    next();
  });
}

module.exports = JWTVerifier;
