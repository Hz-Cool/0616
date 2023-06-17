import React, { Component } from "react";
import { Popover } from "antd";
import InfoIcon from "src/assets/icon/nomal/info.png";
import styles from "./index.less";

const content = (
  <div>
    <p>
      1、PSR (Positive Sentiment Ratio) = Positive Comments / (Positive Comments
      + Negative Comments)
    </p>
    <p>
      2、Category PSR evaluates the average performance of the whole category to
      provide a benchmark for SKUs. Category PSR data time span is one year and
      will be quarterly updated.
    </p>
    <p>
      3、The red means numbers below category PSR, green means numbers above
      category PSR.
    </p>
    <p>4、If the number of comments is less than 30, no color will be marked</p>
  </div>
);
class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className={styles.popoverIcon}>
        <Popover
          placement="leftTop"
          // title={text}
          content={content}
          // trigger="click"
          // style={{ width: 200, color: "pink" }}
        >
          <img src={InfoIcon} />
        </Popover>
      </div>
    );
  }
}

export default Info;
