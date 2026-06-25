import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import config from "../../config";
import { UserPayload } from "./user.interface";



const registerUserIntoDB = async (payload: UserPayload) => {
    const { name, email, password, profilePhoto } = payload;
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

    return user;
}

export const userService = {
    registerUserIntoDB
}


