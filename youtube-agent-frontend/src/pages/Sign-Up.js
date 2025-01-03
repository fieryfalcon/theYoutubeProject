import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";

const { Title } = Typography;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await signup({
        email: values.email,
        password: values.password,
      });
      if (response.success) {
        navigate("/");
        message.success("Account created successfully!");
      }
    } catch (error) {
      message.error("Sign-Up failed!");
    } finally {
      setLoading(false);
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
        Create Account
      </Title>
      <Form layout="vertical" onFinish={handleSignUp}>
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
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
        >
          <Input.Password placeholder="Confirm your password" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Create Account
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
