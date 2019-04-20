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
      <div style={this.getStyle()}>
        <p>
          { id }
        </p>
        <p>
          { email }
        </p>
        <p>
          {amount}
        </p>
        <p>
          {desc}
        </p>
      </div>
    )
  }
}

// PropTypes
LoanItem.propTypes = {
  loan: PropTypes.object.isRequired,
}

export default LoanItem
