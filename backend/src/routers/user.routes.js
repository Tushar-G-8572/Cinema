import { Router } from "express";
import {handleFavoriteController,handleWatchHistoryController,getFavoriteMovies,getWatchHistoryMovies} from '../controllers/user.controller.js';
import authUser from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post('/upload/favorite/:id',authUser,handleFavoriteController);
userRouter.post('/upload/watch-history/:id',authUser,handleWatchHistoryController);

userRouter.get('/favorites',authUser,getFavoriteMovies);
userRouter.get('/watch-history',authUser,getWatchHistoryMovies);


export default userRouter;