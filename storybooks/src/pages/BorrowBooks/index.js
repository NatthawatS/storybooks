import React, { useState } from "react";
import firebase from "firebase";
import { Form, Button, Card, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearBooking } from "../../reducers/booking";
import MainLayout from "../../components/layout/MainLayout";
import moment from "moment";

const { RangePicker } = DatePicker;

const ListBooks = ({ indexs, isbn, nameBook, author }) => (
  <div
    style={{
      display: "flex",
      flex: 1,
      borderWidth: 0.5,
      borderRadius: 3,
      borderStyle: "solid",
      borderColor: "#D9D9D9",
      padding: 10,
      marginBottom: 10,
    }}
  >
    <span>{indexs}</span>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <span>ISBN (Book ID.) :</span>
        <span>{isbn}</span>
      </div>
      <div>
        <span>Name of the book :</span>
        <span>{nameBook}</span>
      </div>
      <div>
        <span>Author :</span>
        <span>{author}</span>
      </div>
    </div>
  </div>
);
const BorrowBooks = () => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [dates, setDates] = useState([]);
  const arrBooking = useSelector((state) => state.booking.book);

  // console.log(moment(dates[0]).format('DD-MM-YYYY'))
  const dispatch = useDispatch();

  const layout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  // console.log(booking);
  const disabledDate = (current) => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 29;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 29;
    return tooEarly || tooLate;
  };

  const onFinish = () => {
    form
      .validateFields()

      .then(async (values) => {
        // console.log(moment(values.borrowdate[0]).format("DD-MM-YYYY"))
        // console.log(moment(values.borrowdate[1]).format("DD-MM-YYYY"))
        const db = firebase.firestore();
        const updateFiles = arrBooking.map((items) => {
          db.collection("library")
            .doc(items.key)
            .update({
              status: "Available",
              startDate: moment(values.borrowdate[0]).format("DD-MM-YYYY"),
              endDate: moment(values.borrowdate[1]).format("DD-MM-YYYY"),
            });
        });

        await Promise.all(updateFiles).then(() => {
          console.log("loading");
          history.push("/");
          dispatch(clearBooking());

        });
      })
      .catch((info) => {
        form.resetFields();
        // setSubmitting(true);
        console.log("Validate Failed:", info);
      });
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
          <h2>Borrow Books</h2>
          <div
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#E8E8E8",
              marginBottom: 20,
            }}
          />
          {arrBooking.map((dup, index) => (
            <ListBooks
              key={dup.key}
              indexs={`${index + 1}. `}
              isbn={dup.isbn}
              nameBook={dup.bookTitle}
              author={dup.author}
            />
          ))}
          <Form
            {...layout}
            name="normal_login"
            form={form}
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{
              backgroundColor: "#F8F8F8",
              borderRadius: 3,
              padding: 10,
            }}
          >
            <Form.Item
              label="Borrow date"
              name="borrowdate"
              rules={[
                { required: true, message: "Please input your Description!" },
              ]}
            >
              <RangePicker
                // renderExtraFooter={() => "extra footer"}
                disabledDate={disabledDate}
                onCalendarChange={(value) => {
                  setDates(value);
                }}
              />
            </Form.Item>

            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Button onClick={() => history.push("/")}>Cancel</Button>

              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  (dates && dates.length === 0) ||
                  dates === null ||
                  arrBooking.length === 0
                }
              >
                Save
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default BorrowBooks;
