import React from 'react'
import { Layout } from 'antd';

const { Header, Content } = Layout;

const LayoutView = (props) => {

    return (
        <>
            <Layout id="root-layout">
                <Header id="search-layout-header" >
                    {props.sider}
                </Header>
                <Content id="search-layout-content-container">
                    {props.content}
                </Content>
            </Layout>
        </>
    )
}

export default LayoutView