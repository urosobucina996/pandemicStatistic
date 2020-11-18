import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from 'antd';
import "./layout.css";

const { Header, Content, Footer } = Layout;

export default function PageLayout({children, links}){

    const [currentRoute, setCurrentRoute] = React.useState();
    const location = useLocation();
    React.useEffect(() => {
      const {pathname} = location;
      const current    = links.find(({to})=>to === pathname);
      setCurrentRoute(current);
    }, [location,links]);

    return (
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" selectedKeys={[currentRoute?.key]}>
              {links.map( ({key,title,to}) => <Menu.Item key={key}>
                  <Link to={to}>
                    {title}
                  </Link>
                </Menu.Item>
              )}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Pandemic</Breadcrumb.Item>
              <Breadcrumb.Item>{currentRoute?.title}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">
                {children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      );
}
