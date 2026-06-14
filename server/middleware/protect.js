import { auth } from "express-oauth2-jwt-bearer";

const protect = auth({
  audience: "https://job-portal-h2e0.onrender.com",
  issuerBaseURL: "https://dev-gfgs5zwhuz3mwhd5.us.auth0.com",
});

export default protect;