import React, { Component } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.form = React.createRef();
  }
  toggle(evt) {
    evt.preventDefault();
    this.setState({
      modal: !this.state.modal,
    });
  }

  renderModal() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.state.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>UPC</ModalHeader>
        <Form inline ref={this.form} id="myForm" onSubmit={evt => this.props.submitForm(evt)}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="productName" className="mr-sm-2">
              Product Name
            </Label>
            <Input
              type="name"
              name="product_name"
              onChange={this.props.handleInputChange}
              value={this.props.product_name}
              id="productName"
              required
              placeholder="pepsi cola"
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="upcCode" className="mr-sm-2">
              UPC Code
            </Label>
            <Input
              type="number"
              onChange={this.props.handleInputChange}
              value={this.props.upc}
              name="upc"
              id="upcCode"
              required
              placeholder="525353253"
            />
          </FormGroup>
        </Form>
        <ModalFooter>
          <Input type="submit" className="btn btn-primary" color="secondary" form="myForm" />
          <Button color="secondary" onClick={this.toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderTable() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>UPC</th>
          </tr>
        </thead>
        <tbody>
          {this.props.upcs.map((upc, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{upc.product_name}</td>
                <td>{upc.upc}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <section className="upc_section">
        <Button color="danger" className="m-3" onClick={this.toggle}>
          ADD UPC
        </Button>
        {this.renderTable()}
        {this.renderModal()}
      </section>
    );
  }
}

export default ListProduct;
