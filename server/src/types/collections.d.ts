import type { Document, Types, UpdateWriteOpResult } from "mongoose";

export type UserType = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  last_update: Date;
  created_at: Date;
};

export type CookType = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  cir: string;
};

export type CreateCook = Omit<CookType, "_id">;

export type SupplierType = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  cnpj: string;
};

export type CreateSupplier = Omit<SupplierType, "_id">;

export enum EnumProvisions {
  "Feijão",
  "Arroz",
  "Macarrão",
}

export type ProvisionType = {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  type: EnumProvisions;
};

export type CreateProvision = Omit<ProvisionType, "_id">;

export type SessionType = {
  _id?: Types.ObjectId;
  email: string;
  token: string;
  active: boolean;
};

export type APIModelsKeys =
  | "User"
  | "Cook"
  | "Supplier"
  | "Session"
  | "Provision";

export type APIModelsTypes =
  | UserType
  | CookType
  | SessionType
  | SupplierType
  | ProvisionType;

export type UserDocument = MongoDocument<UserType>;
export type CookDocument = MongoDocument<CookType>;
export type SessionDocument = MongoDocument<SessionType>;
export type SupplierDocument = MongoDocument<SupplierType>;
export type ProvisionDocument = MongoDocument<ProvisionType>;

export type AnyDocument =
  | UserDocument
  | CookDocument
  | SessionDocument
  | SupplierDocument
  | ProvisionDocument;

export interface QueriesGeneric {
  [key: string]: unknown;
}

export interface QueryParameters {
  limit?: number;
  sort_by?: "name" | "created_at" | "last_update";
  sort?: string;
}

export type NonNullMongoDocument<T> =
  | Document<unknown, unknown, T> &
      T & {
        _id: Types.ObjectId;
      };

export type MongoDocument<T> =
  | (Document<unknown, unknown, T> &
      T & {
        _id: Types.ObjectId;
      })
  | null;

export interface UpdateResponse {
  message: string;
  detail?: Partial<UpdateWriteOpResult>;
}

export interface FindByField {
  field: string;
  value: string;
  model: APIModelsKeys;
}

export interface FindById {
  id: string;
  model: APIModelsKeys;
}

export interface SearchAll {
  queries: QueryParameters;
  model: APIModelsKeys;
}

export interface DeleteOne {
  id: string;
}
