import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import config from "./config";
import cors from "cors";
import prisma from "./lib/prisma";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";

const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
  const user = await prisma.user.findMany();
  console.log(user);
  res.send("hello world");
});

app.post("/api/users/register", async (req: Request, res: Response) => {

    const {name,email,password,profilePhoto} = req.body;
    const isUserExit = await prisma.user.findUnique({
        where: {
            email: email
        } 
    }); 

     if (isUserExit) {
        throw new Error("User already exists");
     }

     const hashedPassword = await bcrypt.hash(password, Number(config.bycryptSaltRounds));
    
    const createdUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
        }
    });

 await prisma.profile.create({
        data: {
      useId: createdUser.id,
            profilePhoto: profilePhoto
        }
    });

    const user = await prisma.user.findUnique({
        where: {
            id: createdUser.id,
            email: email || createdUser.email
        },
        omit : {
            password: true
        },
        include: {
            profileId: true
        }
    });

  const payload = req.body;
  console.log(payload);
  res.status ( httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,

    message: "User registered successfully",
    data: user
  });
});

export default app;