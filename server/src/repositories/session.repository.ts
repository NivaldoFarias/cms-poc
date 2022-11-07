import { Session } from "../mongo/models";
import AppLog from "../events/AppLog";

interface CreateSessionData {
  email: string;
  token: string;
}

export async function create({ email, token }: CreateSessionData) {
  await new Session({
    email,
    token,
  }).save({
    validateBeforeSave: false,
  });
  return AppLog({ type: "Repository", text: "Session instance inserted" });
}

export async function deleteOne(token: string) {
  const result = await Session.deleteOne({ token });

  AppLog({ type: "Repository", text: "Session instance deleted" });
  return result;
}
