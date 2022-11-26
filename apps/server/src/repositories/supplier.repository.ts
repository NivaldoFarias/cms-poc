import type { CreateSupplier, DeleteOne } from "../types/collections";

import { Supplier } from "../mongo/models";
import AppLog from "../events/AppLog";

export async function create(data: CreateSupplier) {
	const { user, cnpj, name } = data;

	await new Supplier({
		user,
		name,
		cnpj,
	}).save({
		validateBeforeSave: false,
	});

	return AppLog({ type: "Repository", text: "Supplier instance inserted" });
}

export async function deleteOne(data: DeleteOne) {
	const { id } = data;

	const result = await Supplier.findByIdAndDelete(id).exec();

	AppLog({ type: "Repository", text: "Delete Supplier instance" });
	return !!result;
}
