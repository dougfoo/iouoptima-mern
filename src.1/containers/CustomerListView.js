import React from "react";
import axios from "axios";
import Customer from "../components/Customer";
import CustomForm from "../components/Form";


class CustomerList extends React.Component {
  state = {
    customers: []
  };

  fetchCustomers = () => {
//    axios.get("http://127.0.0.1:8000/api/").then(res => {
    this.setState({
      customers: {
                
      }
    });
//    });
  }

  componentDidMount() {
    this.fetchCustomers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchCustomerss();      
    }
  }

  render() {
    return (
      <div>
        <Customers data={this.state.customers} /> <br />
        <h2>Customers</h2>
        <CustomForm requestType="post" 
            customerID={null} btnText="Create" />
      </div>
    );
  }
}

export default LoanList;
