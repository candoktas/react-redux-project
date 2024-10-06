import React from "react";
import "../loading.css";

function Loading() {
  return (
    <div className="loader">
      <div className="wrapper">
        <div className="text">LOADING</div>
        <div className="box"></div>
      </div>
    </div>
  );
}

export default Loading;
