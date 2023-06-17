import React, { useEffect, useState, useRef } from "react";
import styles from "./index.less";
import { Modal, Button } from "antd";

interface Props {}

const ModalElement = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(true);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Modal visible={visible}></Modal>
    </div>
  );
};
export default ModalElement;
