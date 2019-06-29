import React, { Component } from "react";

class Profile extends Component {
  render() {
    console.log(this.props.activeUser);
    console.log(Object.keys(this.props.activeUser));

    return (
      <React.Fragment>
        <h1>Profile</h1>
        <p>This is the IOU Optima app v1.0.1. (c) Doug Foo Enterprises (DFE)</p>
        {JSON.stringify(this.props.activeUser)}
        {Object.entries(this.props.activeUser).map(([k,v]) => (
          <li>{k}:-> {v}</li>
        ))}
      </React.Fragment>
     )
  }
}


export default Profile;