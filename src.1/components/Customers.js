import React, { Component } from 'react';
import CustomerItem from './CustomerItem';
import AddCustomer from './AddCustomer';
import PropTypes from 'prop-types';

class Customers extends Component {
  render() {
    console.log('cust state')
    console.log(this.props.customers)

    return (
      <div>
        <div>
          <AddCustomer addCustomer={this.props.addCustomer} />
        </div>
        <div>
          {this.props.customers.map((customer) => (
            <CustomerItem key={customer.id} customer={customer} delCustomer={this.props.delCustomer} />
          ))}
        </div>
      </div>
    );
  }
}

// PropTypes
Customers.propTypes = {
  customers: PropTypes.array.isRequired,
  delCustomer: PropTypes.func.isRequired,
}

export default Customers;