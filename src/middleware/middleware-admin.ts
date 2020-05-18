import { NextFunction, Request, Response } from "express";

const admin = async (req: Request , res: Response, next: NextFunction) => {
	//401 unauthorized
	//403 forbidden
	if(!req.body.isAdmin) return res.status(403).send('Access Denied.')
	next();
}

export {admin}