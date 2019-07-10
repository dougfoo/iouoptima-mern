import React, { Component } from "react";
import { Form, InputNumber, Select, DatePicker, Input, Modal, Button, Table, message } from 'antd';
import axios from 'axios';
import * as MyConsts from '../configs';

const { Option } = Select;

/* select options -- can i make this a react native function ?? */
function onChange(value) {
  console.log(`selected ${value}`);
}
function onSearch(val) {
  console.log('search:', val);
}

class Loans extends Component {
  constructor(props) {
    super(props);
  }

  state = { 
    visible: false,
    loans: [],
    friends: [],
    add_payee: '',
    add_date: ''
    // auto add_description
    // auto add_amount
  };  // move these add_ to an obj sometime later

  componentDidMount() {
    console.log('consolemount');
    try {
        axios.get(MyConsts.API_URL + '/loans/').then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({ loans: data });
            })
            .catch(function (error) {
              message.error("Axios backend loans error: "+error);
            })

        axios.get(MyConsts.API_URL + '/users/').then(response => response.data)  // change to /friends later
            .then((data) => {
                console.log(data);
                this.setState({ friends: data });
            })
            .catch(function (error) {
              message.error("Axios backend users error: "+error);
            })
    } catch (error) {
      console.error(error);
      message.error("Axios unhandled error: "+error);
    }
  }

  addNewLoanModal = e => {
    console.log("make IOU");
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log('handleOk');
    console.log(e);
    this.setState({
      visible: false,
    });

    const mydata = {payee:3,payor:4,date:'2019-06-30',amount:200.0,description:'loan new',status:'P'}
    const mydata2 = {firstName:'f',lastName:'l',email:'em',phone:'xxxx',password:'p'}

    console.log('posting: ' + mydata)

    try {
      const response = axios.post(MyConsts.API_URL + '/loans/', mydata);
      console.log(response);
      message.success("saved");
    }
    catch(error) {
      message.error("save error: "+error);
    }
  };

  handleChange = e => {
    const { name,value } = e.target;
    console.log(name+'->'+value);
    this.setState({
      [name]: value   // adds new state dynamically for now
    })
  }

  // kind of annoying no 'name' property so have to split a new function
  handleAmountChange = e => {
    this.setState({
      add_amount: e,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onSelectDate = e => {
    console.log('onselectDate: '+e);
    this.setState({
      'add_date': e,
    });
  };

  onSelectPayee = e => {
    console.log('onselectPayee: '+e);
    this.setState({
      'add_payee': e,
    });
  };

  render() {
    console.log(this.props);
    const data = this.state.loans;
    const columns = [
      {
        title: 'Payee',
        dataIndex: 'payee_email',
        key: 'payee_email',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Payor',
        dataIndex: 'payor_email',
        key: 'payor_email',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;">Action Loan {record.name}</a>
          </span>
        ),
      },
    ];

    const friendList = this.state.friends;

    return (
      <React.Fragment>
        <h1>Loans</h1>        
        <Button onClick={this.addNewLoanModal} >Make New IOU</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <p>Enter new IOU...</p>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a Friend"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            onSelect={this.onSelectPayee}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {friendList.map(({id, email}) => (
                <Option name="selopt" value={id} >{email}</Option>
            ))}
          </Select>
          <p></p>
          Loan Amount: <InputNumber placeholder="Enter Amount" onChange={this.handleAmountChange}/>
          Date: <DatePicker format="MM/DD/YYYY" name="add_date" showToday={true} onChange={this.onSelectDate} />
          <Input placeholder="Enter Description" name="add_description" onChange={this.handleChange}/>
          <p>Warning: Avoid Loan Sharks...</p>
        </Modal>
        <Table columns={columns} expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} dataSource={data} />,
      </React.Fragment>
    )
  }
}

//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);

export default Loans;