import {CrudController} from "@tscircle/framework/http/controllers/crudController";
import {userSchema, editUserSchema} from "../schemas/userSchema";
import {UserRepository} from "../repositories/userRepository";

export class UserController extends CrudController {
    constructor() {
        super("internal/user", new UserRepository());
    }

    onStoreValidationSchema = userSchema;
    onUpdateValidationSchema = editUserSchema;
}

exports.restHandler = new UserController().setupRestHandler();
