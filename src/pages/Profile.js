import React, { Component } from "react";
import { Descriptions } from 'antd';  // upgrade antd 3.20

class Profile extends Component {
  render() {
    console.log(this.props.activeUser);
    console.log(Object.keys(this.props.activeUser));

    return (
      <React.Fragment>
        <h1>Profile</h1>

        <Descriptions title="User Info" border
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }} >
          <Descriptions.Item label="email">{this.props.activeUser["email"]}</Descriptions.Item>
          <Descriptions.Item label="First">{this.props.activeUser["firstName"]}</Descriptions.Item>
          <Descriptions.Item label="Last">{this.props.activeUser["lastName"]}</Descriptions.Item>
          <Descriptions.Item label="phone">{this.props.activeUser["phone"]}</Descriptions.Item>
          <Descriptions.Item label="friends">{this.props.activeUser["friends"]}</Descriptions.Item>
          <Descriptions.Item label="id">{this.props.activeUser["id"]}</Descriptions.Item>
        </Descriptions> 
      </React.Fragment>
     )
  }
}

export default Profile;