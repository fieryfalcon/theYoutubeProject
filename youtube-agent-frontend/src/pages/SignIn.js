import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login, googleSignIn } from "../api/authApi";

const { Title, Text } = Typography;

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (values) => {
    setLoading(true);
    try {
      const response = await login(values);
      if (response.success) {
        navigate("/dashboard");
        message.success("Login successful!");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Login failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const response = await googleSignIn();
      if (response.success) {
        navigate("/dashboard");
        message.success("Google Sign-In successful!");
      }
    } catch (error) {
      message.error("Google Sign-In failed!");
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: 24,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: 8,
      }}
    >
      <Title level={3} style={{ textAlign: "center" }}>
        Sign In
      </Title>
      <Form layout="vertical" onFinish={handleSignIn}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Sign In
        </Button>
      </Form>
      <Button style={{ marginTop: 16 }} block onClick={handleGoogleSignIn}>
        Sign in with Google
      </Button>
      <div style={{ marginTop: 16 }}>
        <Text>
          Don't have an account?{" "}
          <a onClick={() => navigate("/signup")}>Create Account</a>
        </Text>
      </div>
      <div style={{ marginTop: 8 }}>
        <Text>
          Forgot your password?{" "}
          <a onClick={() => navigate("/forgot-password")}>Reset Password</a>
        </Text>
      </div>
    </div>
  );
};

export default SignIn;
