import React from "react";
import firebase from "firebase";
import { Form, Input, Button, Card } from "antd";
import { useHistory } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import "./style.css";
const AddNewBook = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const { TextArea } = Input;

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const onFinish = () => {
    const db = firebase.firestore();
    form
      .validateFields()
      .then((values) => {
        console.log(values);

        db.collection("library").add({
          // bookTitle: values.title,
          // isbn: values.isbn,
          // pages: values.pages,
          // size: values.size,
          // yearIssue: values.year,
          // description: values.description,
          // author: values.author,
          // findTap: values.findTag,
          // startDate: null,
          // endDate: null,
          // status: "Borrowed",
          bookTitle: "ชุด ล่าขุมทรัพย์สุดขอบฟ้า",
          isbn: "9786160447848",
          pages: 160,
          size: "14.5 X 19 X 0.8 CM",
          yearIssue: 2563,
          description: "เบ็คเดินทางมาแวนคูเวอร์เพื่อส่งโดเรมีเรียนภาษาแ",
          author: "GOMDORI CO.",
          findTap: "ปกอ่อน",
          startDate: null,
          endDate: null,
          status: "Borrowed",
        });
        // form.resetFields();
        // history.push("/");
      })
      .catch((info) => {
        form.resetFields();
        // setSubmitting(true);
        console.log("Validate Failed:", info);
      });
  };

  const CompInput = ({ title, value, rulesMessage }) => {
    return (
      <Form.Item
        label={title}
        name={value}
        // rules={[{ required: true, message: rulesMessage }]}
      >
        <Input />
      </Form.Item>
    );
  };

  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card hoverable style={{ width: "50%", borderRadius: 6 }}>
          <h2>Add new book</h2>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#E8E8E8",
              marginBottom: 10,
            }}
          />
          <Form
            {...layout}
            name="normal_login"
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <CompInput
              title="Book title"
              value="title"
              rulesMessage="Please input your Book title!"
            />
            <CompInput
              title="Year issue"
              value="year"
              rulesMessage="Please input your Year issue!"
            />
            <CompInput
              title="Author"
              value="author"
              rulesMessage="Please input your Author!"
            />
            <CompInput
              title="ISBN"
              value="isbn"
              rulesMessage="Please input your ISBN!"
            />

            <CompInput
              title="Pages"
              value="pages"
              rulesMessage="Please input your Find Tag!"
            />
            <CompInput
              title="Size"
              value="size"
              rulesMessage="Please input your Find Tag!"
            />
            <CompInput
              title="Find Tag"
              value="findTag"
              rulesMessage="Please input your Find Tag!"
            />
            <Form.Item
              label="Description"
              name="description"
              // rules={[
              //   { required: true, message: "Please input your Description!" },
              // ]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-around",
                marginTop: 20,
              }}
            >
              <Button onClick={() => history.push("/")}>Cancel</Button>

              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddNewBook;
