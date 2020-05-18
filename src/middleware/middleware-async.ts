import { Request, Response, NextFunction } from "express";

type IReqResFun = (req: Request, res: Response) => void;

export default (handler: IReqResFun) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			handler(req, res);
		} catch (err) {
			// res.status(500).send("Something Failed")
			next(err);
		}
	};
};
