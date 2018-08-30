import React, { Component } from 'react';
import { withAuthenticator, Greetings } from 'aws-amplify-react';
import ListProducts from './ListProducts';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div>
        <ListProducts />
      </div>
    );
  }
}

export default withAuthenticator(App, { includeGreetings: true });
