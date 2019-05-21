import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../App.css';

class Users extends Component {
  render() {
    console.log('render users')
    console.log(this.props.users)

    return (
      <div>
        <table className='tg'>
          <tbody className='tg'>
            {this.props.users.map((user) => {
              console.log(user);
              return (
                <tr className='tg'>
                  <td className='tg'>[ ]</td>
                  <td className='tg'>{user.name}</td>
                  <td className='tg'>{user.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;