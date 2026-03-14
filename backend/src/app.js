import express from 'express';
import { errorHandler } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.route.js'; 
import adminRouter from './routers/admin.route.js';
import tmdbRouter from './routers/tmdb.routes.js';
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.urlencoded({extended:true}));

app.use('/api/auth',authRouter);
app.use('/api/admin',adminRouter);
app.use('/api/tmdb',tmdbRouter);

app.use(errorHandler);
export default app;