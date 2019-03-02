import React from "react";
import axios from "axios";
import Loans from "../components/Loans";

class LoanList extends React.Component {

  fetchLoans = () => {
//    axios.get("http://127.0.0.1:8000/api/").then(res => {
      this.setState({
        loans: []
      });
//    });
  }

  componentDidMount() {
    this.fetchLoans();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchLoans();      
    }
  }

  render() {
    return (
      <div>
        <Loans data={this.state.loans} /> <br />
        <h2>Create a loan</h2>
      </div>
    );
  }
}

export default LoanList;
