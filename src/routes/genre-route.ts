import { Request, Response, Router } from "express";
import { auth } from "../middleware/middlewate-auth";
import { admin } from "../middleware/middleware-admin";
// import asyncMiddleware from "../middleware/middleware-async";
//we are not using this above asyncMiddlewate because we used
//npm package named express-async-errors
//since the asyncMiddlewate method was disturbing our
//code readability asyncMiddlewate(async(req,res)...)
import "express-async-errors";
import { Genre, validateGenre } from "../models/genre-model";
const genreRoutes = Router();

// genreRoutes.get(
// 	"/",
// 	asyncMiddleware(async (req: Request, res: Response) => {
// 		const genres = await Genre.find().sort("name");
// 		res.json(genres);
// 	})
// ); //! this would check the error

genreRoutes.get("/", async (req: Request, res: Response) => {
	const genres = await Genre.find().sort("name");
	res.json(genres);
});

//! but here express-async-errors will do that work for us with out
//! extra code on our logic

genreRoutes.get("/:id", async (req: Request, res: Response) => {
	const genre = await Genre.findById({ _id: req.params.id });
	res.json(genre);
});

genreRoutes.post("/", auth, async (req: Request, res: Response) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = new Genre({
		name: req.body.name,
	});
	const result = await genre.save();
	res.json(result);
});

genreRoutes.put("/:id", async (req: Request, res: Response) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const result = await Genre.findByIdAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				name: req.body.name,
			},
		}
	);
	res.json(result);
});

genreRoutes.delete(
	"/:id",
	[auth, admin],
	async (req: Request, res: Response) => {
		const result = await Genre.findByIdAndRemove({
			_id: req.params.id,
		});
		res.json(result);
	}
);

export { genreRoutes };
