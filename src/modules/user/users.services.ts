import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";
import config from "../../config";
import { UserPayload } from "./user.interface";



const registerUserIntoDB = async (payload: UserPayload) => {
    const { name, email, password } = payload;
    const incomingPayload = payload as UserPayload & { ProfilePhoto?: string };
    const profilePhoto = incomingPayload.profilePhoto ?? incomingPayload.ProfilePhoto;
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

            profileId: {
                create : {
                    profilePhoto: profilePhoto
                }
            }
        }
    });

    const { password: _, ...user } = createdUser;

    return user;
}

export const userService = {
    registerUserIntoDB
}


