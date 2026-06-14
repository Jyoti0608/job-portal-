import { auth } from "express-oauth2-jwt-bearer";

const protect = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
});

export default protect;