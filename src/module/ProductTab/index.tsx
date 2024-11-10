import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { AppleFilled } from "@ant-design/icons";
import Product from "../Product";
import styles from "./style.module.css";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Main Courses",
    icon: <AppleFilled />,
    children: <Product />,
  },
  {
    key: "2",
    label: "Side dishes",
    icon: <AppleFilled />,
    children: "Content of Tab Pane 2",
  },
  {
    key: "3",
    label: "Drinks",
    icon: <AppleFilled />,
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Others",
    icon: <AppleFilled />,
    children: "Content of Tab Pane 3",
  },
];

const Products: React.FC = () => (
  <Tabs defaultActiveKey="1" items={items} className={styles.tab_style} />
);

export default Products;
