import * as mongoose from "mongoose";
import Joi from "@hapi/joi";
interface IGenre extends mongoose.Document {
	name: String,
}
const GenreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 100,
	},

});
const validateGenre = (genre: IGenre) => {
	const schema = Joi.object({
		name: Joi.string().trim().min(3).required(),
	});
	return schema.validate(genre);
};
const Genre = mongoose.model<IGenre & mongoose.Document>("Genre", GenreSchema);

export {IGenre,GenreSchema,Genre,validateGenre};