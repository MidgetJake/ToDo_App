const API = require('./api');

let response = {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token,x-token",
        "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT"
    }
};

module.exports.register_user = (event, context, callback) => {
    event.response.autoConfirmUser = true;

    const body = {
        method: 'register_user',
        member_id: event.userName,
    }

    API.call(body).then(response => {
        context.callbackWaitsForEmptyEventLoop = false;
        callback(null, event);
    })
}

module.exports.get_list = (event, context, callback) => {
    const member_id = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1] || "23300"; //23300 is just a dummy id for local testing

    API.get_username(member_id).then(user => {
        const body = {
            method: 'get_tasks',
            member_id: user,
        };

        API.call(body).then(data => {
            response.body = JSON.stringify({data});
            context.callbackWaitsForEmptyEventLoop = false;
            callback(null, response);
        })
    });
}

module.exports.create_task = (event, context, callback) => {
    const eventBody = JSON.parse(event.body);
    const member_id = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1] || "23300"; //23300 is just a dummy id for local testing

    API.get_username(member_id).then(user => {
        const body = {
            method: 'create_task',
            member_id: user,
            task_name: eventBody.name,
        };

        API.call(body).then(data => {
            response.body = JSON.stringify({data});
            context.callbackWaitsForEmptyEventLoop = false;
            callback(null, response);
        })
    });
}

module.exports.update_task = (event, context, callback) => {
    const eventBody = JSON.parse(event.body);
    const member_id = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1] || "23300"; //23300 is just a dummy id for local testing

    API.get_username(member_id).then(user => {
        const body = {
            method: 'update_task',
            member_id: user,
            task_id: eventBody.id,
            completed: eventBody.completed,
        };

        API.call(body).then(data => {
            response.body = JSON.stringify({data});
            context.callbackWaitsForEmptyEventLoop = false;
            callback(null, response);
        })
    });
}

// This could probably be merged into "update_task" but for future proofing it should be separate as additional messages/checks may be put in place
module.exports.delete_task = (event, context, callback) => {
    const eventBody = JSON.parse(event.body);
    const member_id = event.requestContext.identity.cognitoAuthenticationProvider.split(':CognitoSignIn:')[1] || "23300"; //23300 is just a dummy id for local testing

    API.get_username(member_id).then(user => {
        const body = {
            method: 'delete_task',
            member_id: user,
            task_id: eventBody.id,
        };

        API.call(body).then(data => {
            response.body = JSON.stringify({data});
            context.callbackWaitsForEmptyEventLoop = false;
            callback(null, response);
        })
    });
}
