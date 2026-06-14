import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({
  jwksUri: `https://dev-gfgs5zwhuz3mwhd5.us.auth0.com/.well-known/jwks.json`,
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key?.getPublicKey();
    callback(err, signingKey);
  });
};

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not Authorized" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    getKey,
    {
      audience: "https://job-portal-h2e0.onrender.com",
      issuer: `https://dev-gfgs5zwhuz3mwhd5.us.auth0.com/`,
      algorithms: ["RS256"],
    },
    (err, decoded) => {
      if (err) {
        console.log("JWT error:", err.message);
        return res.status(401).json({ message: "Not Authorized" });
      }
      req.auth = decoded;
      next();
    }
  );
};

export default protect;