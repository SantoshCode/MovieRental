import * as mongoose from "mongoose";
import Joi from "@hapi/joi";
import { IMovie } from "./movie-model";
import { ICustomer } from "./customer-mode";

interface IRental extends mongoose.Document {
	customer: ICustomer;
	movie: IMovie;
	dateOut: Date;
	dateReturned: Date;
	rentalFee: Number;
}
const RentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				required: true,
				minlength: 3,
				maxlength: 50,
			},
			isGold: {
				type: Boolean,
				default: false,
			},
			phone: {
				type: String,
				required: true,
				min: 5,
				max: 50,
			},
		}),
		required: true,
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				required: true,
				minlength: 3,
				maxlength: 100,
			},
			dailyRentalRate: {
				type: Number,
				required: true,
				min: 0,
				max: 100,
			},
		}),
		required: true,
	},
	dateOut:{
		type: Date,
		required: true,
		default: Date.now(),
	},
	dateReturned:{
		type: Date,
	},
	rentalFee:{
		type: Number,
		min: 0
	}
});
const validateRental = (rental: IRental) => {
	const schema = Joi.object({
		customerId: Joi.string().required(),
		movieId: Joi.string().required()
	});
	return schema.validate(rental);
};
const Rental = mongoose.model<IRental & mongoose.Document>(
	"Rental",
	RentalSchema
);
export { Rental, validateRental, RentalSchema, IRental };
