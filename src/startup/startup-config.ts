import dotenv from "dotenv";
dotenv.config();

export default function () {
	if (!process.env.PRIVATE_KEY) {
		throw new Error("FATAL ERROR: jwtPrivateKey is not defined ");
	}
}
