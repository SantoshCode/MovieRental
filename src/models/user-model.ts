import * as mongoose from "mongoose";
import Joi from "@hapi/joi";
import jwt from "jsonwebtoken";
interface IUser extends mongoose.Document {
	name: string;
	email: string;
	password: string;
	generateAuthToken(): string;
}
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
	email: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 255,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 1024,
	},
	isAdmin: Boolean
});
UserSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id,isAdmin: this.isAdmin }, process.env.PRIVATE_KEY!);
	return token;
};
const validateUser = (user: IUser) => {
	const schema = Joi.object({
		name: Joi.string().trim().min(5).max(50).required(),
		email: Joi.string().trim().min(5).max(255).required().email(),
		password: Joi.string()
			.min(5)
			.max(255)
			.regex(/^[a-zA-Z0-9]{3,30}$/)
			.required(),
	});
	return schema.validate(user);
};
const User = mongoose.model<IUser>("User", UserSchema);

export { IUser, UserSchema, User, validateUser };
