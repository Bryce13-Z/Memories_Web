import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

import postRouters from './routes/posts.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}));
app.use(cors());

app.use("/posts", postRouters);

// connect to the database 
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECT_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => { console.log(`server running on port: ${PORT}`)});
    })
    .catch((error) => {
        console.log(error.message);
    })
