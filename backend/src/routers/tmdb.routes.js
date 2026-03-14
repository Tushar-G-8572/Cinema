import { Router } from "express";
const tmdbRouter = Router();
import { searchMoviesByTitle,fetchMoviesTvController,discoverMovieAndTv, searchMovieById } from "../controllers/tmdb.controller.js";

tmdbRouter.get('/fetch',fetchMoviesTvController);
tmdbRouter.get('/discover',discoverMovieAndTv)
tmdbRouter.get("/search", searchMoviesByTitle);
tmdbRouter.get('/details/:type/:id', searchMovieById)

export default tmdbRouter;