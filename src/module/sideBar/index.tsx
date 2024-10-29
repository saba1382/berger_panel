import React, { FC, useEffect, useState } from 'react';
import { FileAddFilled, EnvironmentFilled, BookFilled, WindowsFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import styles from './style.module.css'
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  link?: string,
  children?: MenuItem[],
): MenuItem {
  return {
    label,
    key,
    icon,
    link,
    children,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '1', <WindowsFilled />, "/"),
  getItem('Orders', '2', <BookFilled />, "Orders"),
  getItem('Restaurant', '3', <EnvironmentFilled />, "Restaurant"),
  getItem('Products', '4', <FileAddFilled />, "Products"),
];

type IProps = {

}

const SideBar: FC<IProps> = props => {

  const [activeTab, setActiveTab] = useState<string>('1')

  const navigate = useNavigate();

  const currentRoute = useLocation()

  const handleMenuClick = ({ key }: any) => {
    setActiveTab(String(key))

    const { link }: any = items.find((item:any) => item.key === key) || {};
    if (link) {
      navigate(link);
    }
  };

  useEffect(() => {
    const route = currentRoute.pathname == '/Products' ? 4 : currentRoute.pathname == '/Restaurant' ? 3 : currentRoute.pathname == '/Orders' ? 2 : 1;
    setActiveTab(String(route))
  }, [])


  return (
      <Menu selectedKeys={[activeTab]} mode="inline" className={styles.menu} items={items} onClick={handleMenuClick} />
  );
};

export default SideBar;