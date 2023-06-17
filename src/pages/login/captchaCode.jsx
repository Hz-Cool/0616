import React, { useState, useRef } from "react";
import { Input, Row, Col } from "antd";
import Captcha from "react-captcha-code";

const CaptchaCode = ({ onChange, setCaptchaCode }) => {
  const captchaRef = useRef(null);
  const [val, setVal] = useState("");

  function handleCaptchaChange(e) {
    setCaptchaCode(e);
  }

  // 刷新验证码
  function handleChangeCaptcha() {
    captchaRef?.current.refresh();
  }

  function inputChange(e) {
    setVal(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
    <Row>
      <Col span={16}>
        <Input
          style={{ width: "100%", height: 40 }}
          placeholder="请输入验证码"
          value={val}
          onChange={inputChange}
        />
      </Col>
      <Col span={8} title="点击刷新" style={{ cursor: "pointer" }}>
        <Captcha
          ref={captchaRef}
          charNum={4}
          onChange={handleCaptchaChange}
          bgColor="#e7f0fd"
        />
      </Col>
    </Row>
  );
};

export default CaptchaCode;
