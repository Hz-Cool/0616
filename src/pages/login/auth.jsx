import React, { Component } from "react";
import { Result, Button } from "antd";
import { history, useLocation } from "umi";


const Authority = (props) => {


  const { location } = useLocation();
  console.log("🚀  Authority  location:", location)

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Result
        status="warning"
        title={
          <>
            <div>服务到期，请联系相关业务续费!</div>
            {/* <div>Please wait for the administrator to activate your access within 2 working days</div> */}
          </>
        }
      />
    </div>
  );
};

export default Authority;
