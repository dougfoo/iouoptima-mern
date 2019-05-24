import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../App.css';
import { Button } from 'antd/lib/radio';
import { Modal, Input } from 'antd';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      isShowing: false,
      selectedItem: 'none'
    }
  }

  showModal = (i) => {
    this.setState({
        isShowing: true,
        selectedItem: i.email
    });
    console.log('showModal '+i.email);
  }

  closeModal = () => {
      this.setState({
          isShowing: false,
          selectedItem: 'none'
      });
  }

  render() {
    console.log('render users')
    console.log(this.props.users)

    return (
      <div>
        <div> 
          { this.state.isShowing ? <div onClick={this.closeModal} className="back-drop"></div> : null }
          <Modal
            title="Make an IOU"
            visible={this.state.isShowing}
            onOk={this.closeModal}
            onCancel={this.closeModal}>
                  Make an IOU for: {this.state.selectedItem} 
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
                    <td className='tg'><Button className="open-modal-btn" onClick={() => this.showModal(user)}>Make IOU</Button></td>
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