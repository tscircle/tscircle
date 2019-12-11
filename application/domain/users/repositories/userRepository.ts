import {BaseRepository} from "@tscircle/framework/repository/baseRepository";
import {User} from "../models/userModel";
import {createPerson} from "../services/mangoUserCreateion";

export class UserRepository extends BaseRepository {
    model = User;

    public add = async (data) => {
        return createPerson(data)
            .then((result) => {
                return this.model
                    .create({
                        'mangopay_user_id': result.user.Id,
                        'mangopay_wallet_id': result.wallet.Id,
                        'wallet_iban': result.bankingAliases.IBAN,
                        'ext_user_id': data.ExtUserId
                    })
                    .then(() => {
                        return {
                            'ext_user_id': data.ExtUserId,
                            'mangopay_user_id': result.user.Id,
                            'mangopay_wallet_id': result.wallet.Id,
                            'wallet_iban': result.bankingAliases.IBAN
                        };
                    })
            }).catch(error => {
                throw {
                    status: 400,
                    error: error
                };
            });
    };
}
