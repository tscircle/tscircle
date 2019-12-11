import {expect} from 'chai';
import 'mocha';
import {createPerson} from "../services/mangoUserCreateion";

const DATA = {
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
        "Country": "FR"
    }
};

describe('Mangopay User creation  tests', () => {
    it('should create a user, wallet and bankAliases ', async () => {
        return createPerson(DATA).then((res) => {
            expect(res.user).to.have.property('Id').that.is.a('string').and.to.not.be.empty;
            expect(res.wallet).to.have.property('Id').that.is.a('string').and.to.not.be.empty;
            expect(res.bankingAliases).to.have.property('IBAN').that.is.a('string').and.to.not.be.empty;
        })
    });
});
