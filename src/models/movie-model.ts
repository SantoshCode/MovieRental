import * as mongoose from 'mongoose';
import Joi from "@hapi/joi";
import {GenreSchema} from './genre-model'
interface IMovie extends mongoose.Document{
	title: String,
	numberInStock: Number,
	dailyRentalRate: Number
}
const MovieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100,
	},
	genre: GenreSchema,
	numberInStock: {
		type: Number,
		required: true,
		min: 0,
		max: 100,
	},
	dailyRentalRate: {
		type: Number,
		required: true,
		min: 0,
		max: 100,
	},
});
const validateMovie = (movie: IMovie) => {
	const schema = Joi.object({
		title: Joi.string().min(3).trim().required(),
		genreId: Joi.string().required(),
		numberInStock: Joi.number().min(3).required(),
		dailyRentalRate: Joi.number().min(3).required(),
	});
	return schema.validate(movie);
};
const Movie = mongoose.model<IMovie & mongoose.Document>("Movie", MovieSchema);
export { Movie, validateMovie, MovieSchema,IMovie };