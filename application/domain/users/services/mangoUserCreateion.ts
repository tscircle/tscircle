import * as mangopay from 'mangopay2-nodejs-sdk';
import * as UserNatural from 'mangopay2-nodejs-sdk/lib/models/UserNatural';

import getConfig from "@tscircle/framework/config/config";
const config = getConfig('mangopay');

const api = new mangopay(config[config.default]);

const IBAN_COUNTRY = 'FR';

export interface person {
    FirstName: string,
    LastName: string,
    Birthday: number, //timestamp
    Nationality: string,
    CountryOfResidence: string
    Email: string,
    Address: {
        AddressLine1: string,
        AddressLine2: string,
        City: string,
        Region?: string,
        PostalCode: string,
        Country: string,
    }
    Tag?: string //TODO automatically save the vendor id as TAG
}

export interface legal {
    Name: string,
    Email: string,
    LegalRepresentativeFirstName: string,
    LegalRepresentativeLastName: string,
    LegalRepresentativeEmail: string,
    LegalRepresentativeBirthday: number, //timestamp
    LegalRepresentativeNationality: string,
    LegalRepresentativeCountryOfResidence: string,
    HeadquartersAddress: {
        AddressLine1: string,
        AddressLine2: string,
        City: string,
        Region?: string,
        PostalCode: string,
        Country: string,
    },
    CompanyNumber: number,
    Tag?: string
}

export interface walletAliases {
    CreditedUserId: string
    OwnerName: string
    Country: string
    WalletId: string
}

export function createPerson(data: person) {
    return createAllInclusive({PersonType: 'NATURAL', ...data});
}

export function createLegal(data: legal) {
    //TODO Update Wallet BankingAliases and BankAccount Name creation and catch block for LegalPersons
    return createAllInclusive({LegalPersonType: 'BUSINESS', ...data});
}

//TODO Return propper errors
function createAllInclusive(data) {
    return api.Users.create(data)
        .then((user) => {
            return createWallet(user.Id, 'Wallet for user' + user.Id)
                .then((wallet) => {
                   return createAliases({
                        CreditedUserId: user.Id,
                        OwnerName: user.FirstName + ' ' + user.LastName,
                        Country: IBAN_COUNTRY,
                        WalletId: wallet.Id
                    }).then((bankingAliases) => {
                        return {
                            user: user,
                            wallet: wallet,
                            bankingAliases: bankingAliases
                        };
                    })
                }).catch((err) => {
                    console.log("Error", err);
                    const userData = new UserNatural({
                        Id: user.Id,
                        FirstName: 'Corrupt',
                        LastName: 'Corrupt',
                        Email: 'Corrupt@exporo.com'
                    });

                    return api.Users.update(userData);
                })
        }).catch((err) => {
            console.log("User Creation Error", err);
        });
}

function createWallet(userId, name) {
    return api.Wallets.create({
        Owners: [userId],
        Description: name,
        Currency: "EUR",
    })
}

function createAliases(data: walletAliases) {
    return api.BankingAliases.create({
        Type: 'IBAN',
        ...data
    });
}
