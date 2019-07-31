import React from 'react'
import * as MyConsts from '../configs';

function About() {

  // const a = localStorage.getItem('accesstoken')
  // const b = localStorage.getItem('refreshtoken')
  // const c = localStorage.getItem('username')
  // const d = localStorage.getItem('userid')
  const v = MyConsts.getTokens();
  const a = v.accesstoken;
  const b = v.refreshtoken;
  const c = v.username;
  const d = v.userid;

  return (
    <React.Fragment>
      <h1>About</h1>
      <p>This is the IOU Optima app v1.0.1. (c) Doug Foo Enterprises (DFE)</p>
      <p> logged in: </p>
      <ul>
        <li>Access: {a}</li>
        <li>Refresh: {b}</li>
        <li>Username: {c}</li>
        <li>UserID: {d}</li>
      </ul>
    </React.Fragment>
  )
}


export default About;