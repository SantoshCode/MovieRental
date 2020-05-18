import express from "express";

const requestLoggerMiddleWare = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	console.log(`Method : ${req.method}, URL: ${req.originalUrl}`);
	const start = new Date().getTime();
	res.on("finish", () => {
		const elapsed = new Date().getTime() - start;
		console.log(
			`${req.method} ${req.originalUrl} | Status Code: ${res.statusCode} | Time Elapsed: ${elapsed}ms`
		);
	});
	next();
};

export { requestLoggerMiddleWare };
