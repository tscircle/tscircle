import {database} from '@tscircle/framework/database/database';

exports.handler = async (event, context, callback) => {
    try {
        const res = await database.migrate.latest();
        await database.destroy();
        callback(null, res);
    } catch (error) {
        callback(error);
    }
};
