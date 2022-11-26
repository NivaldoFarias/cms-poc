import { Schema } from "mongoose";

import type { UserType, SessionType } from "../types/collections";
import { regex } from "./../utils/constants.util";

export const usersSchema = new Schema<UserType>({
	name: { type: String, required: true, maxLength: 100 },
	email: {
		type: String,
		required: true,
		unique: true,
		index: true,
		match: regex.EMAIL,
	},
	password: { type: String, required: true },
	created_at: { type: Date, required: false, default: Date.now },
});

export const sessionsSchema = new Schema<SessionType>({
	email: { type: String, required: true, unique: true, match: regex.EMAIL },
	token: { type: String, required: false, unique: true, default: null },
	active: { type: Boolean, required: true, default: true },
});

export const suppliersSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	name: { type: String, required: true, maxLength: 100 },
	cnpj: { type: String, required: true, match: regex.CNPJ },
});

export const cooksSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	cir: { type: String, required: true, unique: true, match: regex.CIR },
});

export const provisionsSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User", required: true },
	type: [
		new Schema({
			value: {
				type: String,
				enum: {
					values: ["Arroz", "Feijão", "Macarrão"],
					message: "{VALUE} is not supported",
				},
				required: true,
			},
		}),
	],
});
