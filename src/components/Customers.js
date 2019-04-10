import React, { Component } from 'react';
import CustomerItem from './CustomerItem';
import PropTypes from 'prop-types';

class Customers extends Component {
  render() {
    console.log('cust state')
    console.log(this.props.customers)

    return this.props.customers.map((customer) => (
      <CustomerItem key={customer.id} customer={customer} delCustomer={this.props.delCustomer} />
    ));
  }
}

// PropTypes
Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  email: PropTypes.func.isRequired,
  delCustomer: PropTypes.func.isRequired,
}

export default Customers;