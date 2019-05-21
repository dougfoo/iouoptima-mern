import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../App.css';
import { Button } from 'antd/lib/radio';
import { Modal, Input } from 'antd';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      isShowing: false
    }
  }

  showModal = () => {
    this.setState({
        isShowing: true
    });
  }

  closeModal = () => {
      this.setState({
          isShowing: false
      });
  }

  onButtonClick(e) {
    console.log('buttonclick '+this+' and e '+e);

  }  

  render() {
    console.log('render users')
    console.log(this.props.users)

    return (
      <div>
        <div> 
          { this.state.isShowing ? <div onClick={this.closeModal} className="back-drop"></div> : null }
          <button className="open-modal-btn" onClick={this.showModal}>Open Modal</button>
          <Modal
            title="Basic Modal"
            visible={this.state.isShowing}
            onOk={this.closeModal}
            onCancel={this.closeModal}>
                  Test of this random Modal code                  
                  <Input size="small" placeholder="small size0" />
                  <Input size="small" placeholder="small size1" />
                  <Input size="small" placeholder="small size2" />
          </Modal>
        </div>
        <div>
          <table className='tg'>
            <tbody className='tg'>
              {this.props.users.map((user) => {
                console.log(user);
                return (
                  <tr className='tg'>
                    <td className='tg'><Button onClick={this.onButtonClick.bind(this)}>Make IOU</Button></td>
                    <td className='tg'>{user.name}</td>
                    <td className='tg'>{user.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Users;