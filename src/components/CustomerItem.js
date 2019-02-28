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
    const { id, title } = this.props.customer;
    return (
      <div style={this.getStyle()}>
        <p>
          <input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}
          { title }
          <button onClick={this.props.delCustomer.bind(this, id)} style={btnStyle}>x</button>
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

export default CustomerItem
