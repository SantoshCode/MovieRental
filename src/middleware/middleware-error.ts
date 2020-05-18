import { Errback, Request, Response, NextFunction } from "express";
import winston from "winston";
export default (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	winston.error(err.message, err);
	//Loging some output --> for more complex app
	res.status(500).send("Something Failed");
};
