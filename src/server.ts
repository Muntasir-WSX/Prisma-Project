import app from "./app";
import config from "./config";
import prisma from "./lib/prisma";
import "dotenv/config";

const PORT = config.port;

async function main ()
{
    try
    {

        await prisma.$connect();
        console.log('Connected to the database');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    }
    catch (error)
    {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();

// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });