import { Request, Response } from "express";
import prisma from "../../lib/prisma";
import config from "../../config";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import { userService } from "./users.services";

const registerUser = async (req: Request, res: Response) => {

  try {

    const payload = req.body;
    console.log(payload);
    const user = await userService.registerUserIntoDB(payload);

    res.status ( httpStatus.CREATED).json({
      success: true,
      statusCode: httpStatus.CREATED,

      message: "User registered successfully",
      data: user
    });
  }
  catch (error) {
    console.error(error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}

export const createUser = {registerUser};