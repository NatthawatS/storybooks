import React from 'react';
import './style.css';

const LoadingPage = ({ error }) => {
  if (error) {
    return (
      <div>
        <h1>มีข้อผิดพลาดทางเทคนิคบางประการ</h1>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="loading">
        <div className="bounceball" />
        <div className="text">NOW LOADING</div>
      </div>
    </div>
  );
};

export default LoadingPage;
