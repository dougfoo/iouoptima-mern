import React, { Component } from "react";
import { Select, DatePicker, Input, Modal, Button, Table } from 'antd';
import axios from 'axios';
import * as MyConsts from '../configs';

const { Option } = Select;
/* select options*/
function onChange(value) {
  console.log(`selected ${value}`);
}
function onSearch(val) {
  console.log('search:', val);
}

const BackendAPI = {  
  loadLoans() {
    try {
      axios.get(MyConsts.API_URL + '/loans/').then(response => response.data)
      .then((data) => {
        this.setState({ loans: data })
        console.log(this.state.loans)
       })
    } catch (error) {
      console.error(error);
    }
  },
  addLoan(e) {
    console.log(e)
  }
}

class Loans extends Component {
  constructor(props) {
    super(props);
  }

  state = { 
    visible: false,
    loans: [ // temp stat -- tb replaced by axios call
      {
        id: 1,
        payee: 1,
        payor: 2,
        date: '2019-05-05',
        amount: '333.50',
        description: 'loan 1 long description blah blah blah',
        status: 'P'
      },
      {
        id: 2,
        payee: 2,
        payor: 3,
        date: '2019-06-05',
        amount: '100',
        description: 'loan 2',
        status: 'A'
      }
    ]
  };

  addNewLoanModal = e => {
    console.log("make IOU");
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.setState(previousState => ({
      loans: [...previousState.loans, {id:3,payee:3,payor:4,date:'2019-06-30',amount:200.0,description:'loan new',status:'P'}]
    }));
    console.log('setted the new state array)');
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render() {
    console.log(this.props);
    const data = this.state.loans;
    const columns = [
      {
        title: 'Payee',
        dataIndex: 'payee',
        key: 'payee',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Payor',
        dataIndex: 'payor',
        key: 'payor',
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
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>,
          <Input placeholder="Enter Amount"/>
          <DatePicker format="MM/DD/YYYY" showToday={true}/>
          <Input placeholder="Enter Description"/>
          <p>Some contents...</p>
        </Modal>
        <Table columns={columns} expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} dataSource={data} />,
      </React.Fragment>
    )
  }
}

//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);

export default Loans;