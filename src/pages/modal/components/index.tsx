import React, { useEffect, useState, useRef, memo } from "react";
import styles from "./index.less";
console.log("🚀  styles:", styles);
import { Modal, Button } from "antd";

interface Props {
  visible: boolean;
  setVisible: (data: boolean) => void;
}

const ModalElement = (props: Props) => {
  const { visible, setVisible } = props;
  // 浏览器的高度 默认设置为0；
  const [width, setWidth] = useState(0);

  const resizeUpdate = (e: any) => {
    // 通过事件对象获取浏览器窗口的高度
    let h = e.target.innerWidth;
    setWidth(h);
  };

  useEffect(() => {
    // 页面刚加载完成后获取浏览器窗口的大小
    let h = window.innerWidth;
    setWidth(h);

    // 页面变化时获取浏览器窗口的大小
    window.addEventListener("resize", resizeUpdate);

    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener("resize", resizeUpdate);
    };
  }, []);

  return (
    <div className={styles["modal"]}>
      <Button onClick={() => setVisible(true)}>Open</Button>
      <Modal
        open={visible}
        title={"删除这款产品"}
        width={600}
        onCancel={() => setVisible(false)}
        footer={null}
        centered={width > 600}
        transitionName={"ant-move-down"}
      >
        <div className={"content"}>
          <div className={"tip"}> 您是否确认从“我的购物袋”中删除这款产品？</div>
          <div className={"info"}>
            <div className={"img"}>
              <img src="https://www.louisvuitton.cn/images/is/image/lv/1/PP_VP_L/louis-vuitton--GI0869_PM2_Front%20view.png?wid=216&hei=216" />
            </div>
            <div className={"detail"}>
              <div className={"name"}>路易泰迪熊</div>
              <div className={"price"}>¥10,400</div>
            </div>
          </div>
          <div className={"footer"}>
            <Button className={"cancel"}>取消</Button>
            <Button className={"del"}>删除</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default memo(ModalElement);
