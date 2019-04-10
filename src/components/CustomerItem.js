import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CustomerItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.customer.completed ? 'line-through' : 'none'
    }
  }

  render() {
    const { id, name, email } = this.props.customer;
    return (
      <div style={this.getStyle()}>
        <p>
          <button onClick={this.props.delCustomer.bind(this, id)} style={btnStyleBlue}>Make IOU</button>
          { name } - { email }
          <button onClick={this.props.delCustomer.bind(this, id)} style={btnStyle}>Delete</button>
        </p>
      </div>
    )
  }
}

// PropTypes
CustomerItem.propTypes = {
  customer: PropTypes.object.isRequired,
  delCustomer: PropTypes.func.isRequired,
}

const btnStyle = {
  background: '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right'
}

const btnStyleBlue = {
  background: '#00f',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'left'
}
export default CustomerItem
