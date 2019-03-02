import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class LoanItem extends Component {
  getStyle = () => {
    return {
      background: '#f4f4f4',  
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.loan.completed ? 'line-through' : 'none'
    }
  }

  render() {
    const { id, title } = this.props.loan;
    return (
      <div style={this.getStyle()}>
        <p>
          { title }
        </p>
      </div>
    )
  }
}

// PropTypes
LoanItem.propTypes = {
  loan: PropTypes.object.isRequired,
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

export default LoanItem
