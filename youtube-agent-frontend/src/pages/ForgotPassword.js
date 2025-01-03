import React, { useState } from "react";
import { Button, Form, Input, Typography, message } from "antd";
import { sendPasswordReset } from "../api/authApi";

const { Title } = Typography;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (values) => {
    setLoading(true);
    try {
      const response = await sendPasswordReset({ email: values.email });
      if (response.success) {
        message.success("Password reset email sent!");
      }
    } catch (error) {
      message.error("Error sending reset email.");
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
        Reset Password
      </Title>
      <Form layout="vertical" onFinish={handleForgotPassword}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" placeholder="Enter your email" />
        </Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Send Reset Email
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
