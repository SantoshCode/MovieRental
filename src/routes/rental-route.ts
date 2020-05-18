import express from "express";
import {Rental,validateRental} from '../models/rental-model';
import {Movie} from '../models/movie-model';
import {Customer} from '../models/customer-mode';
const rentalRotues = express.Router();

const movieRoutes = express.Router();

rentalRotues.get("/", async (req: express.Request, res: express.Response) => {
	try {
		const rentals = await Rental.find().sort("-dateOut");
		res.json(rentals);
	} catch (err) {
		console.error(err);
	}
});
rentalRotues.get("/:id", async (req: express.Request, res: express.Response) => {
	try {
		const rental = await Rental.findById({ _id: req.params.id });
		res.json(rental);
	} catch (err) {
		console.error(err);
	}
});

rentalRotues.post("/", async (req: express.Request, res: express.Response) => {
	const { error } = validateRental(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.body.customerId)
	if(!customer) return res.status(400).send('Invalid Customer')

	const movie = await Movie.findById(req.body.movieId)
	if(!movie) return res.status(400).send('Invalid movie')

	if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate
		}
	})
	rental = await rental.save();

	movie.numberInStock = (movie.numberInStock as number) - 1;
	movie.save();

	res.send(rental);
});



export { rentalRotues };
