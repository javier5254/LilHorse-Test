import { Input, Form, Card, Button, Alert } from "antd";
import React, { useState } from "react";
import { authLogin, selectAuth } from "../../redux/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectAuth);

  const onFinish = () => {
    dispatch(authLogin(email, password));
  };

  return (
    <div className="row">
      <div className="mx-auto col-md-4 col-sm-12">
        {error && (
          <Alert
            showIcon
            message="Las credenciales que suministraste no coinciden con los registros"
            type="error"
            style={{ marginTop: "2vh", position: "absolute" }}
          />
        )}
        <Card title="Iniciar sesión" style={{ marginTop: "20vh" }}>
          <Form name="login-form" onFinish={onFinish} autoComplete="off">
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Por favor ingresa tu correo" },
                {
                  type: "email",
                  message: "Por favor ingresa un correo válido",
                },
              ]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Ingresa tu correo"
                autoComplete="email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Por favor ingresa tu contraseña" },
              ]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={!email || !password}
              >
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
