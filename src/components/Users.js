import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../App.css';
import { Button } from 'antd/lib/radio';
import { Modal, Input, DatePicker, Form } from 'antd';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      isShowing: false,
      selectedItem: 'none',
      newIouAmount: '0',
      newIouCategory: '',
      newIouDescription: '',
      newIouDate: ''
    }
  }

  showModal = (i) => {
    this.setState({
        isShowing: true,
        selectedItem: i.email
    });
    console.log('showModal '+i.email);
  }

  onNewIouChange = (e) => {
    console.log("onNewIouChange " +e.target.name + ': ' +e.target.value);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onDateChange = (e) => {    
    this.setState({
      newIouDate: e.target.value
    })
    console.log("onDateChange: " +e);
  }

  resetStates = () => {
    this.setState({
      isShowing: false,
      selectedItem: 'none',
      newIouAmount: '0',
      newIouCategory: '',
      newIouDescription: '',
      newIouDate: ''
    });
  }

  closeModal = () => {
    this.resetStates();
  }

  cancelModal = () => {
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
            onCancel={this.cancelModal}>
               <Form>
                  <label>Make an IOU for: {this.state.selectedItem} </label><br/>
                  <label>Amount <input onChange={this.onNewIouChange} name="newIouAmount" size="4" placeholder="0.00" /></label><br/>
                  <label>Category <input onChange={this.onNewIouChange} size="small" width="35" name="newIouCategory" placeholder="personal loan" /></label><br/>
                  <label>Description <input onChange={this.onNewIouChange} size="small" class="input" name="newIouDescription" placeholder="dinner" /></label><br/>
                  <label>Date <DatePicker onChange={this.onDateChange} /></label>
               </Form>
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