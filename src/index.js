import express from 'express';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';
import noteRouter from './routes/noteRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;
dotenv.config();

// MIDDLE WARE

app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
//     console.log('HTTP MEthod... ' + req.method + ', URL - ' + req.url);
//     next();
// });

// ROUTES
app.use('/users', userRouter);
app.use('/notes', noteRouter);
app.get('/', (req, res) => {
    res.send('NOTES API');
});

// MONGODB CONNECTION
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening at ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
