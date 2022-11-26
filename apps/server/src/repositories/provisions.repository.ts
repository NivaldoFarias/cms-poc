import type { CreateProvision, DeleteOne } from "../types/collections";

import { Provision } from "../mongo/models";
import AppLog from "../events/AppLog";

export async function create(data: CreateProvision) {
	const { user, type } = data;

	await new Provision({
		user,
		type,
	}).save({
		validateBeforeSave: false,
	});

	return AppLog({ type: "Repository", text: "Provisions instance inserted" });
}

export async function deleteOne(data: DeleteOne) {
	const { id } = data;

	const result = await Provision.findByIdAndDelete(id).exec();

	AppLog({ type: "Repository", text: "Delete Provisions instance" });
	return !!result;
}
