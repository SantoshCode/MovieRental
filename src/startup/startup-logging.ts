import winston from "winston";
import { MongoDB } from "winston-mongodb";
import "express-async-errors"; //! this will terminate the process if any error occurs

export default function () {
	winston.createLogger({
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({
				filename: "exception.log",
				handleExceptions: true,
			}),
		],
	});

	process.on("unhandledRejection", (reason, promise) => {
		throw reason;
	});

	winston.add(
		new MongoDB({
			db: "mongodb://localhost:5001/vidly",
			options: {
				useUnifiedTopology: true,
			},
			level: "info",
		})
	);
}
