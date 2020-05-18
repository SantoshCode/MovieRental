import * as mongoose from "mongoose";
import Joi from "@hapi/joi";
interface ICustomer extends mongoose.Document {
	name: String;
	isGold: Boolean;
	phone: String;
}
const CustomerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50,
	},
	isGold: {
		type: Boolean,
		default: false
	},
	phone: {
		type: String,
		required: true,
		min: 5,
		max: 50,
	},
});
const validateCustomer = (customer: ICustomer) => {
	const schema = Joi.object({
		name: Joi.string().min(3).trim().required(),
		isGold: Joi.boolean().required(),
		phone: Joi.string().min(3).required(),
	});
	return schema.validate(customer);
};
const Customer = mongoose.model<ICustomer & mongoose.Document>("Customer", CustomerSchema);
export { Customer, validateCustomer, CustomerSchema, ICustomer };
