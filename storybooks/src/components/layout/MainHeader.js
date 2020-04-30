import React from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase";
import styled from "styled-components";
import { Menu, Dropdown, Button } from "antd";
import { logout } from "../../reducers/authReducer";
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";

import banner from "../home/banner.jpg";
import logo from "../home/logo.png";

const Container = styled.div`
  display: flex;
  flex: 1;
  background-image: url(${banner});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right top;
  height: 428px;
  padding: 20px;
  justify-content: space-between;
`;

const menu = (dispatch) => {
  return (
    <Menu>
      <Menu.Item
        icon={<LogoutOutlined />}
        key="logout"
        onClick={() => {
          dispatch(logout());
          firebase.auth().signOut();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );
};
const MainHeader = () => {
  const dispatch = useDispatch();
  const me = firebase.auth().currentUser;
  const strSplit = me.email.split("@")[0];

  return (
    <Container>
      <img src={logo} alt={logo} height="30" width="250" />
      <div style={{ alignItems: "center" }}>
        <Dropdown overlay={menu(dispatch)} placement="bottomLeft">
          <Button
            icon={
              <UserOutlined
                style={{
                  fontSize: 20,
                }}
              />
            }
            type="link"
            ghost
            onClick={(e) => e.preventDefault()}
          >
            {strSplit}
            <DownOutlined
              style={{ color: "#ffffff", fontSize: 16, marginLeft: 10 }}
            />
          </Button>
        </Dropdown>
      </div>
    </Container>
  );
};

export default MainHeader;
