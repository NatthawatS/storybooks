import React, { useState } from "react";
import firebase from "firebase/app";
import queryString from "query-string";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";

const RegisterNow = () => {
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [form] = Form.useForm();

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitting(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(values.username, values.password)
          .then(async () => {
            setSubmitting(false);
            const parsed = queryString.parse(location.search);
            history.push(parsed.redirect || "/");
          })
          .catch((error) => {
            const args = {
              message: "ไม่สำเร็จ !!",
              description: error.message,
              duration: 2,
              type: "error",
            };
            notification.open(args);
            setSubmitting(false);
            console.log(values);
          });
      })
      .catch((info) => {
        form.resetFields();
        setSubmitting(true);
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Form
      name="normal_login"
      form={form}
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <div>RegisterNow</div>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={submitting}
        >
          RegisterNow
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterNow;
