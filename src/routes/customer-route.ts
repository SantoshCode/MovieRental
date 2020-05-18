import express from "express";
import { Customer, validateCustomer} from "../models/customer-mode";

const customerRoutes = express.Router();

customerRoutes.get("/", async (req: express.Request, res: express.Response) => {
	try {
		const customers = await Customer.find().sort("name");
		res.json(customers);
	} catch (err) {
		console.error(err);
	}
});
customerRoutes.get("/:id", async (req: express.Request, res: express.Response) => {
	try {
		const customer = await Customer.findById({ _id: req.params.id });
		res.json(customer);
	} catch (err) {
		console.error(err);
	}
});

customerRoutes.post("/", async (req: express.Request, res: express.Response) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = new Customer({
		name: req.body.name,
		isGold: req.body.isGold,
		phone: req.body.phone,
	});
	const result = await customer.save();
	res.json(result);
});

customerRoutes.put("/:id", async (req: express.Request, res: express.Response) => {
	const { error } = validateCustomer(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	try {
		const result = await Customer.findByIdAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					name: req.body.name,
					isGold: req.body.isGold,
					phone: req.body.phone,
				},
			}
		);
		res.json(result);
	} catch (err) {
		console.error(err);
	}
});

customerRoutes.delete(
	"/:id",
	async (req: express.Request, res: express.Response) => {
		try {
			const result = await Customer.findByIdAndRemove({
				_id: req.params.id,
			});
			res.json(result);
		} catch (err) {
			console.error(err);
		}
	}
);

export { customerRoutes };
