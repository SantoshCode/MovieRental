import { app } from "./app";
import mongoose = require("mongoose");
import * as http from "http";
import winston from "winston";
import "express-async-errors";
const server = http.createServer(app);

const PORT = 3001;

server.listen(PORT);

server.on("listening", () => {
	console.log(`Server is running on port ${PORT}`);
	mongoose.connect("mongodb://localhost:5001/vidly", {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	});
	mongoose.connection.on("connected", () => console.log("Connected"));
	mongoose.connection.on("error", () =>
		console.log("Connection failed with - ")
	);

	mongoose.set("useCreateIndex", true);
});
