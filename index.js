/** @format */

import { AppRegistry } from 'react-native';
import App from './App';
import Amplify from 'aws-amplify';
import { name as appName } from './app.json';

const appSyncConfiguration = {
  aws_appsync_graphqlEndpoint: 'https://li42rmxmjrcfjadg66y5jxtgna.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-bdktrkxprzhc7lvz5vppwmfwwe',
};
Amplify.configure({ ...appSyncConfiguration });

AppRegistry.registerComponent(appName, () => App);
