import {database} from '@tscircle/framework/database/database';

exports.handler = async (event, context, callback) => {
    //TODO if rds event is something like pause
        //then halt EC2 Instance
        console.log(JSON.stringify(event, null, 2));
    //TODO if rds event is something like started
        //then start EC2 Instance again
};
