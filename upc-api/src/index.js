import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import configuration from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';

const appSyncConfiguration = {
  aws_appsync_graphqlEndpoint: 'https://li42rmxmjrcfjadg66y5jxtgna.appsync-api.us-east-1.amazonaws.com/graphql',
  aws_appsync_region: 'us-east-1',
  aws_appsync_authenticationType: 'API_KEY',
  aws_appsync_apiKey: 'da2-bdktrkxprzhc7lvz5vppwmfwwe',
};
Amplify.configure({ ...configuration, ...appSyncConfiguration });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
