import * as Joi from "@hapi/joi";

const userSchema = Joi.object().keys({
    ExtUserId: Joi.number().required(),
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Birthday: Joi.date().timestamp().required(),
    Nationality: Joi.string().required(),
    CountryOfResidence: Joi.string().required(),
    Email: Joi.string().required(),
    Address: {
        AddressLine1: Joi.string().required(),
        AddressLine2: Joi.string(),
        City: Joi.string().required(),
        Region: Joi.string(),
        PostalCode: Joi.string().required(),
        Country: Joi.string().required(),
    }
});

const editUserSchema = Joi.object().keys({
    ExtUserId: Joi.number(),
    FirstName: Joi.string(),
    LastName: Joi.string(),
    Birthday: Joi.date().timestamp(),
    Nationality: Joi.string(),
    CountryOfResidence: Joi.string(),
    Email: Joi.string(),
    Address: {
        AddressLine1: Joi.string(),
        AddressLine2: Joi.string(),
        City: Joi.string(),
        Region: Joi.string(),
        PostalCode: Joi.string(),
        Country: Joi.string(),
    }
});

export { userSchema, editUserSchema };
