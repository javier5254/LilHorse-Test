import React from "react";
import { Button, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../hooks/hooks";
import { authLogout } from "../redux/auth/auth.slice";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to="/home">Home</Link>, "2", <HomeOutlined />),
  getItem(<Link to="/todo">To Do App</Link>, "1", <AppstoreOutlined />),
];
export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const logoutHandler = (): void => {
    dispatch(authLogout());
  };
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Menu
        theme="dark"
        mode="inline"
        items={items}
      />
      <Button
        type="primary"
        className="btn-logout"
        onClick={() => logoutHandler()}
      >
        Logout
      </Button>
    </Sider>
  );
};
