import dotenv from 'dotenv';
import path from 'path';




dotenv.config({path: path.join(process.cwd(), ".env")});

export default {
    port : process.env.PORT,
    app_url : process.env.APP_URL,
    databaseUrl : process.env.DATABASE_URL,
    bycryptSaltRounds : process.env.BCRYPT_SALT_ROUNDS,
    jwtSecret_access_secret : process.env.JWT_SECRET_ACCESS_SECRET,
    jwtSecret_refresh_secret : process.env.JWT_SECRET_REFRESH_SECRET,
    jwt_access_token_expiration : process.env.JWT_ACCESS_TOKEN_EXPIRATION,
    jwt_refresh_token_expiration : process.env.JWT_REFRESH_TOKEN_EXPIRATION,

}

