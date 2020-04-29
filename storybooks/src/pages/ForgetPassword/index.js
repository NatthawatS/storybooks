import React, { useState } from "react";
import firebase from "firebase/app";
import queryString from "query-string";
import { Form, Input, Button, notification, Modal } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";

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
        >
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgetPassword;

// import Banner from '../../common/img/bg.jpg';
// import LoginOri from '../../common/img/logo.png';

// const LogoLayout = styled.div`
//   @media (min-width: 481px) {
//     display: none;
//   }
//   @media (min-width: 320px) and (max-width: 480px) {
//     background-color: #ffffff;
//     height: 53px;
//     padding-top: 4px;
//     padding-bottom: 4px;
//     padding-left: 10px;
//     padding-right: 10px;
//     background-size: contain;
//     background-repeat: no-repeat;
//   }
// `;

// const LogoStyle = styled.div`
//   background-image: url(${LoginOri});
//   height: 100%;
//   background-size: contain;
//   background-repeat: no-repeat;

//   @media (min-width: 481px) {
//     display: none;
//   }
//   @media (min-width: 320px) and (max-width: 480px) {
//     background-image: url(${LoginOri});
//     height: 100%;
//     background-size: contain;
//     background-repeat: no-repeat;
//   }
// `;
// const LogoFullLayout = styled.div`
//   background-color: #ffffff;
//   height: 50px;
//   background-size: contain;
//   background-repeat: no-repeat;

//   @media (min-width: 320px) and (max-width: 480px) {
//     display: none;
//   }
// `;

// const LayoutMargin = styled.div`
//   margin-bottom: 20px;
// `;

// const Container = styled.div`
//   display: flex;
//   flex: 1;
//   background-image: url(${Banner});
//   background-size: cover;
//   background-repeat: no-repeat;
//   background-position: right top;
//   height: 100vh;
//   align-items: center;
//   justify-content: center;

//   @media (min-width: 320px) and (max-width: 480px) {
//     background-image: url('${process.env.PUBLIC_URL}/loginStyle/mobileBG2.png');
//     background-size: cover;
//     background-repeat: no-repeat;
//     height: 100vh;
//     align-items: flex-start;
//     justify-content: center;
//   }
// `;

// const LogoPhoto = styled.div`
//   @media (min-width: 481px) {
//     background-image: url(${LoginOri});
//     height: 100%;
//     background-size: contain;
//     background-repeat: no-repeat;
//   }
//   @media (min-width: 320px) and (max-width: 480px) {
//     display: none;
//   }
// `;

// const success = history => {
//   Modal.success({
//     title: 'ลืมรหัสผ่าน',
//     content: 'ส่งขั้นตอนการตั้งค่ารหัสผ่านใหม่ไปยัง email ของท่านแล้ว',
//     onOk: () => history.push('/'),
//   });
// };

// class Login extends React.Component {
//   render() {
//     const { history } = this.props;
//     const { getFieldDecorator } = this.props.form;

//     return (
//       <Container>
//         <div
//           style={{
//             backgroundColor: '#fff',
//             padding: 20,
//             borderRadius: 6,
//             width: 350,
//             margin: 20,
//           }}
//         >
//           <Form
//             onSubmit={e => {
//               e.preventDefault();
//               this.props.form.validateFields(async (err, values) => {
//                 if (!err) {
//                   firebase
//                     .auth()
//                     .sendPasswordResetEmail(values.username)
//                     .then(() => {
//                       success(history);
//                     })
//                     .catch(error => {
//                       console.log(error);
//                     });
//                 }
//               });
//             }}
//             className="login-form"
//           >
//             <LogoFullLayout>
//               <LogoPhoto />
//             </LogoFullLayout>
//             <LogoLayout>
//               <LogoStyle />
//             </LogoLayout>
//             <LayoutMargin>
//               {getFieldDecorator('username', {
//                 initialValue: '',
//                 rules: [
//                   { required: true, message: 'Please input your username!' },
//                 ],
//               })(
//                 <Input
//                   prefix={
//                     <Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />
//                   }
//                   placeholder="Send Email"
//                 />,
//               )}
//             </LayoutMargin>
//             <LayoutMargin>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 className="login-form-button"
//                 style={{
//                   width: '100%',
//                   backgroundColor: '#FF8429',
//                   color: '#ffffff',
//                   borderColor: '#ffffff',
//                 }}
//               >
//                 ลืมรหัสผ่าน
//               </Button>
//             </LayoutMargin>
//           </Form>
//         </div>
//       </Container>
//     );
//   }
// }

// export default Form.create()(Login);
