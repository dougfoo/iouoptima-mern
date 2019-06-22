import React, { Component } from 'react';
import LoanItem from './LoanItem';
import PropTypes from 'prop-types';

class Loans extends Component {
  render() {
    console.log('loans state')
    console.log(this.props.loans)

    return (
      <div>
        <div>
          New Loans Page
        </div>
        <div>
          <table>
            <tbody>
              {this.props.loans.map((loan) => (
              <LoanItem key={loan.id} markComplete={this.props.markComplete} loan={loan} delLoan={this.props.delLoan} />  
              ))}
            </tbody>
          </table>
        </div>
      </div>  
    );
  }
}

// PropTypes
Loans.propTypes = {
  loans: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
}

export default Loans;