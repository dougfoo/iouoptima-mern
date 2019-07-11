import React, { Component } from "react";
import { message, Button, Table, Divider } from 'antd';
import * as MyConsts from '../configs';
import axios from 'axios';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    console.log('consolemount');
    console.log('loadUsers()');
    try {
        if (this.props.activeUser) {
          axios.get(MyConsts.API_URL + '/users/'+activeUser.id).then(response => response.data)
              .then((data) => {
                  console.log(data);
                  this.setState({ users: data });
                  console.log(this.state.users);
              })
              .catch(function (error) {
                message.error("Axios backend users error: "+error);
              })
        }
        else {
          axios.get(MyConsts.API_URL + '/users/').then(response => response.data)
              .then((data) => {
                  console.log(data);
                  this.setState({ users: data });
                  console.log(this.state.users);
              })
              .catch(function (error) {
                message.error("Axios backend users error: "+error);
              })
        }
    } catch (error) {
    console.error(error);
    }
  }
  
  handleAddFriend = e => {
    console.log('add friend click');
  }

  render() {
    console.log(this.props);
    const title = this.props.activeUser ? "Friends" : "User Admin";
    const data = this.state.users;
    const columns = [
      {
        title: 'FirstName',
        dataIndex: 'firstName',
        key: 'firstName',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'LastName',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Make Loan {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">De-Friend</a>
          </span>
        ),
      },
    ];

    return (
      <React.Fragment>
        <h1>{title}</h1>
        <Button onClick={this.handleAddFriend} >Add Friend</Button>
        <Table columns={columns} dataSource={data} />
      </React.Fragment>
    )
  }
}

export default Users;