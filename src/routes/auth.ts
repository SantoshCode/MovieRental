import _ from "lodash";
import express from "express";
import Joi from "@hapi/joi";
import { User } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const validateUser = (user: {
	email: string;
	password: string;
}): Joi.ValidationResult => {
	const schema = Joi.object({
		email: Joi.string().trim().min(5).max(255).required().email(),
		password: Joi.string().min(5).max(255).required(),
	});
	return schema.validate(user);
};

const authRoutes = express.Router();

authRoutes.post("/", async (req: express.Request, res: express.Response) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("Invalid email or password");

	const validPassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validPassword)
		return res.status(400).send("Invalid email or password");

	// const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY!);
	const token = user.generateAuthToken();
	res.send(token);
});

export { authRoutes };
