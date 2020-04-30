import React from "react";
import { Layout } from "antd";
import version from "../../common/version";

const { Footer } = Layout;

export default () => {
  return (
    <Footer>
      Version
      {version} By NatthawatS
    </Footer>
  );
};
