import { EC2 } from 'aws-sdk';

function pauseEC2(ec2: EC2, params) {
    console.log(`RDS Cluster Paused ... Stopping the Bastion Host ... Instance ID: ${params.InstanceIds}`)
    return ec2.stopInstances(params, function (err, data) {
        if (err) console.log(JSON.stringify(err), err.stack);
        else console.log(JSON.stringify(data));
    }).promise();
}

function startEC2(ec2: EC2, params) {
    console.log(`RDS Cluster Resumed ... Starting the Bastion Host ... Instance ID: ${params.InstanceIds}`)
    return ec2.startInstances(params, function (err, data) {
        if (err) console.log(JSON.stringify(err), err.stack);
        else console.log(JSON.stringify(data));
    }).promise();
}

exports.handler = async (event, context, callback) => {
    var instance_id = process.env.BASTION_HOST_INSTANCE_ID!;
    console.log(JSON.stringify(event, null, 2));
    var event_message = JSON.parse(event.Records[0].Sns.Message)
    var ec2 = new EC2();
    var params = {
        InstanceIds: [instance_id],
        DryRun: false
    };
    if (event_message["Event Message"].includes("paused") && event_message["Event Message"].includes("being")) {
        return pauseEC2(ec2, params)
    }
    else if (event_message["Event Message"].includes("resumed") && event_message["Event Message"].includes("being")) {
        return startEC2(ec2, params)
    }
};