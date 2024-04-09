import { Layout } from "antd";
import React from "react";
import { Sidebar } from "./Sidebar";
import { AppRouter } from "../router/AppRouter";
import { BrowserRouter } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import { selectAuth } from "../redux/auth/auth.slice";
import { TodoContextProvider } from "../context/todo";

const { Content, Footer, Header } = Layout;

export const LayoutBase: React.FC = () => {
  const { userInfo } = useAppSelector(selectAuth);
  return (
    <BrowserRouter>
      <Layout>
        {userInfo?.token && <Sidebar></Sidebar>}
        <Layout>
          {userInfo?.token && (
            <Header style={{ padding: 0, background: "#fff" }} />
          )}
          <Content style={{ margin: "24px 16px 0" }}>
            <TodoContextProvider>
              <AppRouter></AppRouter>
            </TodoContextProvider>
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
