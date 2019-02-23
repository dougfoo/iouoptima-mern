import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

class Loans extends Component {
  render() {
    return this.props.Loans.map((loan) => (
      <LoanItem key={loan.id} loan={loan} markComplete={this.props.markComplete} delLoan={this.props.delLoan} />
    ));
  }
}

// PropTypes
Loans.propTypes = {
  loans: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delLoan: PropTypes.func.isRequired,
}

export default Loans;