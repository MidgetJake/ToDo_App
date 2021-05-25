# To Do App
A very bare bones task list app that will let you create tasks, complete them or delete them.
With 3 different components:
- API
    - Built in NodeJS
    - Uses Serverless to deploy it to AWS API-Gateway/Lambda
    - Uses a PostgreSQL database to store data
- Mobile App
    - Built in React-Native
    - Uses Redux for state management
    - Uses AWS-Amplify to control the API
    - Thus also utilising Cognito for authentication
- Web app
    - Same as the mobile except it uses React, not React-Native
    
---
## Deploying the API
Since the API utilises AWS, it is a prerequisite that aws-cli is installed and configured to work with serverless.
It is also required that a PostgreSQL database is available and open for lambda functions to be able to connect to.

1. Run `npm install -g serverless` to install serverless
1. As with each of these the first step is to run `npm install` within the directory to get all the dependencies
2. Inside `serverless.yml` in `custom` properties there is `postgres: pg://test_user:InsecurePassword@localhost:5432/todo_api`
Replace the details within this to the correct connection details for a postgres server.
3. You may need to add vpc settings within the `provider` also. Uncomment and change the values as needed
3. Connect to your postgres server with either a program like pgAdmin or cli tool like psql.
4. Run each of the sql files found in the `Schema` folder. `create_base_schema.sql` must be run first. The order doesn't matter for the rest
5. Back in the root of `ToDoApi` run `sls deploy`

## Running the mobile app
1. In the root (`ToDoMobile`) there is a `config.js` file. Replace the strings with the correct values for the services.
   This is required for Cognito and API-Gateway connections.
2. Connect and Android device or a simulator for iOS/Android
3. Run `npm install`
4. If on iOS navigate into `ios` and run `pod install`
5. Back in the root `ToDoMobile` run `npm run android` or `npm run ios`

## Running the web app
1. In the `src` folder there is a `config.js` file. Replace the strings with the correct values for the services.
   This is required for Cognito and API-Gateway connections.
2. Run `npm install -g webpack webpack-cli webpack-dev-server`
3. Run `npm install`
4. Run `npm webpack` for an initial build
5. Run `webpack-dev-server` to start development server for running the app locally

