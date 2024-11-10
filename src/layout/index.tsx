import { FC, useState } from 'react';
import { Avatar, Badge, Dropdown, Input, Layout, MenuProps, Space, theme } from 'antd';
import styles from './style.module.css'
import SideBar from '../module/sideBar';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from '../pages/Dashboard';
import OrdersPage from '../pages/Orders';
import ProductPage from '../pages/Products';
import RestaurantPage from '../pages/Resturant';
import { MoreOutlined, SearchOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';
// import { SendOutlined, MoreOutlined  } from '@ant-design/icons';
import { click } from '@testing-library/user-event/dist/click';

const { Header, Content, Sider } = Layout;

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];

type IProps = {

}

const LayoutProject: FC<IProps> = props => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={styles.logo} >
          <div className={styles.logo_icon}></div>
          <span>avoburger</span>
        </div>
        <SideBar/>
        <div className={styles.footer}>
          <div className={styles.styleButton}>
            <p>Done for the day?</p>
            <div className={styles.button}>
              <SendOutlined />
              <span>Send the report</span>
            </div>
          </div>
          <div className={styles.Br}></div>
          <div>
             <Dropdown menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()} className={styles.changstyl}>
                  <Space>
                <Badge size="small" dot status="success" offset={[-10,5]}>
                    <Avatar  size="large" icon={<UserOutlined />}/>
                  </Badge>
                    Saba Moradi 
                    <MoreOutlined />
                  </Space>
                </a>
              </Dropdown>

          </div>
        </div>
        
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