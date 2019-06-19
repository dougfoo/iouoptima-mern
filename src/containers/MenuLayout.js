import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

class MenuLayout extends React.Component {
    render() {
        const { location } = this.props;
        return (
            <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} >
                <Menu.Item key="/login/">
                    <Link to="/login/">login</Link>
                </Menu.Item>
                <Menu.Item key="/about/">
                    <Link to="/about/">About</Link>
                </Menu.Item>
            </Menu>
        );
    }

    renderOld() {
        return (
            <Layout className="layout">
                <Menu theme="dark"mode="horizontal" defaultSelectedKeys={['0']} style={{ lineHeight: '64px' }} >
                    <Menu.Item key="0">
                        <Link to="/login/">Login*TBD</Link>
                    </Menu.Item>
                    <Menu.Item key="1">
                        <Link to="/users/">Users</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/users2/">Users Old</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/loans/">Loans</Link>
                    </Menu.Item>                        
                    <Menu.Item key="4">
                        <Link to="/about/">About</Link>
                    </Menu.Item>
                </Menu>
            </Layout>
        );
    }

}

export default MenuLayout;