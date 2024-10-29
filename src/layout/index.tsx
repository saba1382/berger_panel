import { FC, useState } from 'react';
import { Input, Layout, theme } from 'antd';
import styles from './style.module.css'
import SideBar from '../module/sideBar';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard';
import OrdersPage from '../pages/Orders';
import ProductPage from '../pages/Products';
import RestaurantPage from '../pages/Resturant';
import { SearchOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;


type IProps = {

}

const LayoutProject: FC<IProps> = props => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={styles.logo} >
        <div className={styles.logo_icon}></div>
        <span>avoburger</span>
        </div>
        <SideBar/>
      </Sider>


      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Input type="text" name='search' prefix={<SearchOutlined/>} className={styles.search} placeholder='Search'/>
        </Header>
        <Content className={styles.main}>
          <Routes>
            <Route path="/" element={ <DashboardPage/> } />
            <Route path="Orders" element={ <OrdersPage/> } />
            <Route path="Restaurant" element={ <RestaurantPage/> } />
            <Route path="Products" element={ <ProductPage/> } />
            <Route path="*" element={<DashboardPage/>} />
          </Routes>
        </Content>
      </Layout>


    </Layout>
  );
};

export default LayoutProject