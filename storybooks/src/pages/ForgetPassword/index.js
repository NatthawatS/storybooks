import React, { useState } from "react";
import firebase from "firebase/app";
import { Form, Input, Button, notification, Modal } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import CardLayout from "../../components/layout/CardLayout";
import { Container } from "../../components/Container";
import "../../components/styleForm.css";

const success = (history) => {
  Modal.success({
    title: "ลืมรหัสผ่าน",
    content: "ส่งขั้นตอนการตั้งค่ารหัสผ่านใหม่ไปยัง email ของท่านแล้ว",
    onOk: () => history.push("/"),
  });
};

const ForgetPassword = () => {
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitting(true);
        console.log(values);
        firebase
          .auth()
          .sendPasswordResetEmail(values.email)
          .then(() => {
            success(history);
            setSubmitting(false);
          })
          .catch((error) => {
            console.log(error);
            const args = {
              message: "ไม่สำเร็จ !!",
              description: error.message,
              duration: 2,
              type: "error",
            };
            notification.open(args);
            setSubmitting(false);
          });
      })
      .catch((info) => {
        form.resetFields();
        setSubmitting(true);
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Container>
      <CardLayout topic="Forgot password">
        <span style={{ marginBottom: 10 }}>
          Enter the email address you used when you joined
        </span>
        <Form
          name="normal_login"
          form={form}
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={submitting}
              style={{
                flex: 1,
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#0076C2",
                color: "#ffffff",
              }}
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </CardLayout>
    </Container>
  );
};

export default ForgetPassword;
