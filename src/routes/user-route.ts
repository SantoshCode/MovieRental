import _ from "lodash";
import {auth} from '../middleware/middlewate-auth'
import express from "express";
import { validateUser, User } from "../models/user-model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userRoutes = express.Router();

userRoutes.get('/me',auth,async (req:express.Request |any , res: express.Response)=>{
	const user = await User.findById(req.userId).select('-password')
	res.send(user);
})

userRoutes.post("/", async (req: express.Request, res: express.Response) => {
	const { error } = validateUser(req.body);
	if (error) return res.status(400).send("Invalid inputs");

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send("User already registered");

	user = new User(_.pick(req.body, ["name", "email", "password"]));

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	// const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY!);
	const token = user.generateAuthToken();

	res.header("x-auth-token", token).send(
		_.pick(user, ["_id", "name", "email"])
	);
});

export { userRoutes };
