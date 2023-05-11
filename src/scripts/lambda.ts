const aws = require("aws-sdk");

// Event Record body should be formatted in the following type:

type RecordBody = {
    params: {
        Source: string, // Email sent from ...
        Template: string, // Email Template Name
        Destination: {
            ToAddresses: string[] // Email sent to ...
        },
        TemplateData: Object, // Template data to replace `{{...}}` in email Template
    },
}

// NOTE: AWS Lambda does not natively support typescript. 
// If you wish to use it, transpile it before deploying.

exports.handler = async (event) => {
    try {
        console.log("event: ", event);

        // event has property (typeof Array) called "Records"
        const { Records } = event;

        // Loop over Records
        await Records.forEach(async (record) => {
            // Parse the message into JSON object
            const body = JSON.parse(record?.body);

            // Logs the body of the message
            console.log("Incoming message body from SQS: ", body);

            // Start sending the email
            const ses = new aws.SES({ region: "eu-west-2" });

            // Send Templated Email
            const result = await ses.sendTemplatedEmail(body?.params).promise();

            console.log(result);
        });

        // Return status if successful
        return { "statusCode": 200, "message": "success" };
    } catch (error) {
        // Log any errors to cloudwatch and return error code
        console.error("Error in executing lambda: ", error);
        return { "statusCode": 500, "message": "Error while execution. Check Cloudwatch logs." }
    }
}