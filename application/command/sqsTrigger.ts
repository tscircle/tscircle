import {Queue} from '@tscircle/framework/queue/queue';

exports.handler = async (event) => {
    return Queue.handleMessages(event.body);
};

