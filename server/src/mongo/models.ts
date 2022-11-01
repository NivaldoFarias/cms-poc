import * as schema from "./schemas";
import mongoose from "mongoose";

mongoose.set("sanitizeFilter", true);

export const User = mongoose.model("User", schema.usersSchema);
export const Cook = mongoose.model("Cook", schema.cooksSchema);
export const Supplier = mongoose.model("Supplier", schema.suppliersSchema);
export const Session = mongoose.model("Session", schema.sessionsSchema);
export const Provision = mongoose.model("Provision", schema.provisionsSchema);
