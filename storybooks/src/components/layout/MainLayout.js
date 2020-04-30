import React from "react";
import { BackTop } from "antd";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import "antd/dist/antd.css";

export default ({ children, backgroundColor = "#ffffff" }) => {
  return (
    <div style={{ backgroundColor }}>
      <MainHeader />
      <div
        style={{
          minHeight: `calc(100vh - 246px)`,
          backgroundColor,
          // marginTop: zeroMargin ? 0 : 16,
          // minHeight: "100vh",
          margin: 20,
        }}
      >
        {children}
        <BackTop />
      </div>
      <MainFooter />
    </div>
  );
};
