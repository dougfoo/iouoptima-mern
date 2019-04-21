import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class LoanItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',  
      padding: '10px',
      borderBottom: '1px #ccc dotted',
    }
  }

  render() {
    const { id, email, amount, desc } = this.props.loan;
    return (
        <tr>
          <td>{id}</td>
          <td>{email}</td>
          <td>{amount}</td>
          <td>{desc}</td>
          <td><input type="checkbox" onChange={this.props.markComplete.bind(this, id)} /> {' '}</td>
        </tr>
    )
  }
}

// PropTypes
LoanItem.propTypes = {
  loan: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
}

export default LoanItem
