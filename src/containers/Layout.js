import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

class CustomLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }} >
                        {
                            this.props.isAuthenticated ?             
                                <Menu.Item key="2" onClick={this.props.logout}>
                                    Logout
                                </Menu.Item>            
                            : (
                                <Menu.Item key="2">
                                    <Link to="/login/">Login</Link>
                                </Menu.Item>
                            )
                        }
                        <Menu.Item key="1">
                            <Link to="/">Cust</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/loans/">Loans</Link>
                        </Menu.Item>                        
                        <Menu.Item key="4">
                            <Link to="/about/">About</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));