import {expect} from 'chai';
import 'mocha';
import {createPerson} from "../services/mangoUserCreateion";
import {createBankAccount, deactivateBankAccount, getBankAccounts} from "../services/mangoBankAccountService";

const BANK_DATA = {
    IBAN: 'DE02120300000000202051',
    BIC: 'BYLADEM1001'
};

const USER_DATA = {
    FirstName: 'Henrik',
    LastName: 'Lippke',
    Birthday: 499113935,
    Nationality: 'DE',
    CountryOfResidence: 'DE',
    Email: 'fake@exporo.com',
    Address: {
        "AddressLine1": "1 Mangopay Street",
        "AddressLine2": "The Loop",
        "City": "Paris",
        "PostalCode": "75001",
        "Country": "DE"
    }
};

describe('Mangopay Bank Account creation tests', () => {
    it('should bankAccount', async () => {
        return createPerson(USER_DATA)
            .then((res) => {
                createBankAccount(res.user.Id, {
                    OwnerName: res.user.FirstName + ' ' + res.user.LastName,
                    OwnerAddress: res.user.Address,
                    ...BANK_DATA
                }).then((res) => {
                    return getBankAccounts(res.UserId)
                        .then((accounts) => {
                            expect(accounts[0]).to.have.property('Active').that.is.true;
                            return accounts;
                        }).then((accounts) => {
                            return deactivateBankAccount(res.UserId, accounts[0].Id);
                        }).then(() => {
                            return getBankAccounts(res.UserId);
                        }).then((accounts) => {
                            expect(accounts[0]).to.have.property('Active').that.is.false;
                        })
                })
            }).catch((error) => {
                console.log(error);
            })
    });
});
