import React, { Component } from 'react';
import { Greetings } from 'aws-amplify-react';
import { Redirect } from 'react-router';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import ListProduct from './ListProduct';
import { listUPCS, createUPC } from './graphql';

class ListProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcs: [],
      upc: '',
      product_name: '',
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async componentDidMount() {
    let response = await API.graphql(graphqlOperation(listUPCS));
    let data = await response.data.listUPCS.items;
    this.setState({ upcs: data });
    // console.log(this.state.upcs);
  }
  onStateChange(state) {
    if (state === 'signedOut') {
      window.location.reload();
    }
  }

  submitForm(evt) {
    evt.preventDefault();
    let upc = {
      upc: this.state.upc,
      product_name: this.state.product_name,
    };
    API.graphql(graphqlOperation(createUPC, upc)).then(data => {
      let upc = data.data.createUPC;
      this.setState({ upcs: [upc, ...this.state.upcs] });
    });
  }

  handleInputChange(evt) {
    evt.preventDefault();
    let name = evt.target.name;
    switch (name) {
      case 'product_name':
        this.setState({ product_name: evt.target.value });
        break;
      case 'upc':
        this.setState({ upc: evt.target.value });
        break;
    }
  }

  render() {
    return (
      <div>
        <ListProduct submitForm={this.submitForm} handleInputChange={this.handleInputChange} upcs={this.state.upcs} />
      </div>
    );
  }
}

export default ListProducts;
