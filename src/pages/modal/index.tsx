import React, { memo, useState } from "react";
import Modal from "./components/index";

const APP = () => {
  const [visible, setVisible] = useState<boolean>(false);
  return <Modal visible={visible} setVisible={setVisible} />;
};
export default memo(APP);
