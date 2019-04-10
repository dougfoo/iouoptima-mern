import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

class MenuLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Menu theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
                    style={{ lineHeight: '64px' }} >
                    <Menu.Item key="0">
                        <Link to="/login/">Login*TBD</Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/custs/">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/loans/">Loans</Link>
                    </Menu.Item>                        
                    <Menu.Item key="3">
                        <Link to="/about/">About</Link>
                    </Menu.Item>
                </Menu>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(MenuLayout));