import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Customers extends Component {
  render() {
    return this.props.Customers.map((customer) => (
      <CustomerItem key={customer.id} markComplete={this.props.markComplete} delCustomer={this.props.delCustomer} />
    ));
  }
}

// PropTypes
Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delCustomer: PropTypes.func.isRequired,
}

export default Customers;