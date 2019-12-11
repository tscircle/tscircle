import * as mangopay from 'mangopay2-nodejs-sdk';
import * as UserNatural from 'mangopay2-nodejs-sdk/lib/models/UserNatural';

import getConfig from "@tscircle/framework/config/config";

const config = getConfig('mangopay');

const api = new mangopay(config[config.default]);

export interface bank {
    OwnerName: string,
    OwnerAddress: Object
    IBAN: string,
    BIC: string
}

export function createBankAccount(userId, data: bank) {
    return api.Users.createBankAccount(userId, {
        Type: 'IBAN',
        ...data
    });
}

export function deactivateBankAccount(userId, bankAccountId) {
    return api.Users.deactivateBankAccount(userId, bankAccountId);
}

export function getBankAccounts(userId) {
    return api.Users.getBankAccounts(userId);
}

