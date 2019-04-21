import React, { Component } from 'react';
import LoanItem from './LoanItem';
import PropTypes from 'prop-types';

class Loans extends Component {
  render() {
    console.log('loans state')
    console.log(this.props.loans)

    return this.props.loans.map((loan) => (
      <LoanItem key={loan.id} loan={loan} delLoan={this.props.delLoan} />  
    ));
  }
}

// PropTypes
Loans.propTypes = {
  loans: PropTypes.array.isRequired,
}

export default Loans;