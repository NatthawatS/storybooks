import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./style.css";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const LoadingPage = ({ error }) => {
  if (error) {
    return (
      <div>
        <h1>มีข้อผิดพลาดทางเทคนิค</h1>
      </div>
    );
  }
  return (
    <div className="wrap">
      <div className="loading">
        <Spin indicator={antIcon} />
        <div className="text">NOW LOADING</div>
      </div>
    </div>
  );
};

export default LoadingPage;
