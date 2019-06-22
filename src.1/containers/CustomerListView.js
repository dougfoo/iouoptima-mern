import React from "react";
import axios from "axios";
import Customer from "../components/Customer";
import CustomForm from "../components/Form";


class CustomerList extends React.Component {
  state = {
    users: []
  };

  fetchusers = () => {
//    axios.get("http://127.0.0.1:8000/api/").then(res => {
    this.setState({
      users: {
                
      }
    });
//    });
  }

  componentDidMount() {
    this.fetchusers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token) {
      this.fetchuserss();      
    }
  }

  render() {
    return (
      <div>
        <users data={this.state.users} /> <br />
        <h2>users</h2>
        <CustomForm requestType="post" 
            customerID={null} btnText="Create" />
      </div>
    );
  }
}

export default LoanList;
