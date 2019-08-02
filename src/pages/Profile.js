import React, { Component } from "react";
import { Form, Button, Descriptions } from 'antd';  // upgrade antd 3.20
import Register from './Register';
import * as MyConsts from '../configs';

class Profile extends Component {
  state = {
    editMe: false,
  };

  editProfile = e => {
    console.log("edit profile");
    this.setState({
      editMe: true
    })
  };

  render() {
    const RegistrationForm = Form.create()(Register);  // can i put this in Register.js
    const user = MyConsts.getTokens().activeUser;

    return (
      <React.Fragment>
        <h1>Profile</h1>

        {! this.state.editMe ? (
          <div>
            <Descriptions title="User Info" border column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} >
              <Descriptions.Item label="email">{user ? user.email : ''}</Descriptions.Item>
              <Descriptions.Item label="First">{user ? user.firstName : ''}</Descriptions.Item>
              <Descriptions.Item label="Last">{user ? user.lastName : ''}</Descriptions.Item>
              <Descriptions.Item label="phone">{user ? user.phone : ''}</Descriptions.Item>
              <Descriptions.Item label="friends">{user ? user.friends : ''}</Descriptions.Item>
              <Descriptions.Item label="id">{user ? user.id : ''}</Descriptions.Item>
            </Descriptions> 
            <Button onClick={this.editProfile} >Edit Profile Details</Button>
          </div>
            ) : (
          <RegistrationForm {...this.props} editForm={true} registerCallback={this.props.registerCallback} />
        )}
      </React.Fragment>

     )
  }
}

export default Profile;