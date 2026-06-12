import dotenv, { config } from "dotenv";
import express from "express";
import { auth } from "express-openid-connect";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import fs from "fs";
import User from "./models/UserModel.js"
import asyncHandler from "express-async-handler";

dotenv.config();


const app = express();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    routes: {
    postLogoutRedirect: process.env.CLIENT_URL,
    callback: "/callback",
    logout: "/logout",
    login: "/login",
  },
  })
);

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.use(auth(config));


//Function to check user exists
const ensureUserInDB= asyncHandler(async(user)=>{
    try {
        const existingUser= await User.findOne({auth0Id:user.sub})
        if(!existingUser)
        {
            const newUser= new User({
                auth0Id:user.sub,
                email:user.email,
                name:user.name,
                role:"jobseeker",
                profilePicture: user.picture,
            });
            await newUser.save();
            console.log("User added to db",user)
        }
        else{
            console.log("User already exist in db ", existingUser)
        }
    } catch (error) {
        console.log("Error checking or adding user to db",error.message)
    }
});

app.get("/",async (req,res) => {
    if(req.oidc.isAuthenticated())
    {
        await ensureUserInDB(req.oidc.user);

        return res.redirect(process.env.CLIENT_URL);
    }
    else
    {
        return res.send("Logged Out");
    }
});

const routeFiles= fs.readdirSync("./routes");

routeFiles.forEach((file)=>{
    import(`./routes/${file}`).then((route)=>{
        app.use("/api/v1/",route.default);
    }).catch((error)=>{
        console.log("Error importing route",error);         
    });
});

const server=async () => {
    try {
        await connect();
        app.listen(process.env.PORT,() =>{
            console.log(`server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("server erroe",error.message)
        process.exit(1);
    }
};

server();