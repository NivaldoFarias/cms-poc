import { UserType } from './collections';

export type CreateUser = Pick<UserType, "name" | "email" | "password">

export type SignInBody = Pick<UserType, "email" | "password">

export type DeleteOne = { id: string };
