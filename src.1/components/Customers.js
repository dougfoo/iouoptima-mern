import React, { Component } from 'react';
import CustomerItem from './CustomerItem';
import AddCustomer from './AddCustomer';
import PropTypes from 'prop-types';

class users extends Component {
  render() {
    console.log('cust state')
    console.log(this.props.users)

    return (
      <div>
        <div>
          <AddCustomer addCustomer={this.props.addCustomer} />
        </div>
        <div>
          {this.props.users.map((customer) => (
            <CustomerItem key={customer.id} customer={customer} delCustomer={this.props.delCustomer} />
          ))}
        </div>
      </div>
    );
  }
}

// PropTypes
users.propTypes = {
  users: PropTypes.array.isRequired,
  delCustomer: PropTypes.func.isRequired,
}

export default users;