import { Router } from "express";
import { deleteController, getAllMovies, getMovieById, updateController, uploadController } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.post("/upload",uploadController);
adminRouter.patch('/update/:id',updateController);
adminRouter.delete('/delete/:id',deleteController);
adminRouter.get('/get-movie/:id',getMovieById);
adminRouter.get('/get-movies',getAllMovies);

export default adminRouter;