'use strict';
const Database = require('./database');
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();
let client = null;

module.exports.call = (packet) => new Promise((resolve, reject) => {
    let conn = process.env.postgres;
    let database = new Database(client, conn, () => {});

    if (packet === null) {
        return reject(210, { error: 'Empty api packet'});
    }

    const call_api = () => {
        client = database.getClient();
        let querySQL = 'SELECT todo_api.api($1::JSON) AS response';

        client.query(querySQL,[packet], async function(err,result){
            if(err) {
                console.log(err);
                reject(220, { error: 'API Call error' });
            } else {
                resolve(result.rows[0].response);
            }
        });
    };

    database.connect(call_api);
});

module.exports.get_username = userSub => new Promise((resolve, reject) => {
    const filter = `sub = "${userSub}"`;
    const req = {
        Filter: filter,
        UserPoolId: "eu-west-2_oA1OTwMnq"
    };

    cognito.listUsers(req, (err, data) => {
        if(err) {
            reject(err);
            return;
        }

        const user = data.Users[0];
        resolve(user.Username);
    })
})
