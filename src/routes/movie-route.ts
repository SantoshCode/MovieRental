import express from "express";
import { Movie, validateMovie } from "../models/movie-model";
import { Genre } from "../models/genre-model";

const movieRoutes = express.Router();

movieRoutes.get("/", async (req: express.Request, res: express.Response) => {
	try {
		const movies = await Movie.find().sort("name");
		res.json(movies);
	} catch (err) {
		console.error(err);
	}
});
movieRoutes.get("/:id", async (req: express.Request, res: express.Response) => {
	try {
		const movie = await Movie.findById({ _id: req.params.id });
		res.json(movie);
	} catch (err) {
		console.error(err);
	}
});

movieRoutes.post("/", async (req: express.Request, res: express.Response) => {
	const { error } = validateMovie(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const genre = await Genre.findById(req.body.genreId.toString())

	const movie = new Movie({
		title: req.body.title,
		genre:genre,
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
	});
	const result = await movie.save();
	res.json(result);
});

movieRoutes.put("/:id", async (req: express.Request, res: express.Response) => {
	const { error } = validateMovie(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const genre = Genre.findById({_id: req.params.genreId})
	try {
		const result = await Movie.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					title: req.body.title,
					genre,
					numberInStock: req.body.numberInStock,
					dailyRentalRate: req.body.dailyRentalRate
				},
			}
		);
		res.json(result);
	} catch (err) {
		console.error(err);
	}
});

movieRoutes.delete(
	"/:id",
	async (req: express.Request, res: express.Response) => {
		try {
			const result = await Movie.findByIdAndRemove({
				_id: req.params.id,
			});
			res.json(result);
		} catch (err) {
			console.error(err);
		}
	}
);

export { movieRoutes };
