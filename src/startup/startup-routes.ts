import express from "express";
import { requestLoggerMiddleWare } from "../middleware/middleware-logger";
import error from "../middleware/middleware-error";
import { genreRoutes } from "../routes/genre-route";
import { movieRoutes } from "../routes/movie-route";
import { customerRoutes } from "../routes/customer-route";
import { rentalRotues } from "../routes/rental-route";
import { userRoutes } from "../routes/user-route";
import { authRoutes } from "../routes/auth";
export default function (app: express.Express) {
	// app.use(cors());
	app.use(express.json());
	app.use(
		express.urlencoded({
			extended: true,
		})
	);

	app.use(requestLoggerMiddleWare);
	app.use("/api/genres", genreRoutes);
	app.use("/api/movies", movieRoutes);
	app.use("/api/customers", customerRoutes);
	app.use("/api/rentals", rentalRotues);
	app.use("/api/users", userRoutes);
	app.use("/api/auth", authRoutes);
	// app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
	app.use(error);
}
