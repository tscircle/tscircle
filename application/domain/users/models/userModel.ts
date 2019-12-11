import { BaseModel } from "@tscircle/framework/model/baseModel";

export interface UserInterface {
    id: number;
    mangopay_user_id: number;
    mangopay_wallet_id: number;
    wallet_iban: string;
}

export class User extends BaseModel {
    public static tableName: string = "users";
}
