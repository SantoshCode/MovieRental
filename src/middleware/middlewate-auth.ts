// import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
export interface IPayload {
	_id: string;
	iat: number;
}

const auth = async (req: Request | any, res: Response, next: NextFunction) => {
	try {
		const token = req.header("x-auth-token");
		if (!token)
			return res.status(401).send("Access Denied . No token provided");
		const decoded = jwt.verify(token, process.env.PRIVATE_KEY!) as IPayload;
		req.userId = decoded._id;
		next();
	} catch (error) {
		console.error(error);
		res.status(400).send("Invalid token");
	}
};

export { auth };
