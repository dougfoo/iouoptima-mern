import React, { Component } from "react";
import { Button, Table } from 'antd';

class Loans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginOpen: true, isRegisterOpen: false, s: false
    };
  }

  handleMakeIOU = e => {
    console.log("make IOU");
  }

  render() {
    console.log(this.props);
    const data = this.props.loans;
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
        <Button onClick={this.handleMakeIOU} >Make New IOU</Button>
        <Table columns={columns} expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>} dataSource={data} />,
      </React.Fragment>
    )
  }
}

//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);

export default Loans;