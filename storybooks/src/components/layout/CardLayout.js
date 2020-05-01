import React from "react";
import "antd/dist/antd.css";

export default ({ children, topic }) => {
  return (
    <div
      style={{
        display: "flex",
        paddingRight: 30,
        paddingLeft: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 3,
        backgroundColor: "#ffffff",
        flexDirection: "column",
        width: 440,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#000000",
          fontWeight: 400,
          fontSize: 26,
          marginBottom: 10,
        }}
      >
        {topic}
      </div>
      {children}
    </div>
  );
};
