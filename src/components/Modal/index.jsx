import React, { useMemo } from "react";
import styles from "./index.less";
import { Modal, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const CreateModal = (props) => {
  const { t } = useTranslation();
  const {
    visible = true,
    width = 650, // 宽度
    okFunc, // 确认函数
    closeFunc, // 关闭函数
    title = "TITLE",
    context,
    footer,
    cancelText = "取消",
    okText = "确认",
    btnInclude = ["cancel", "ok"], // 数组['cancel', 'ok']那些按钮显示
    loading,
    iconStyle,
    style,
    modalStyle,
  } = props;

  const onFinish = (val) => {};

  // 渲染内容
  const rederContext = () => {};
  const momeContext = useMemo(() => rederContext(), [context]);

  // 渲染底部
  const renderFooter = () => {
    if (footer) {
      return footer;
    }
    return (
      <div className={styles["btn"]}>
        {btnInclude.indexOf("cancel") > -1 ? (
          <>
            <Button className={styles["btn-close"]} onClick={() => closeFunc()}>
              {cancelText}
            </Button>
          </>
        ) : null}
        {btnInclude.indexOf("ok") > -1 ? (
          <>
            &nbsp;&nbsp;&nbsp;
            <Button
              className={styles["btn-ok"]}
              onClick={() => okFunc()}
              loading={loading}
            >
              {okText}
            </Button>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <Modal
      visible={visible}
      style={style}
      closable={false}
      width={width}
      footer={null}
    >
      {/* 关闭Icon */}
      <div
        className={styles["closeICON"]}
        style={iconStyle ? { border: iconStyle.border } : {}}
        onClick={() => closeFunc()}
      >
        <CloseOutlined style={iconStyle ? { color: iconStyle.color } : {}} />
      </div>
      <div className={styles["modal"]} id="modal" style={modalStyle}>
        {/* 标题 */}
        <div className={styles["title"]}>{title}</div>
        {/* 内容区域 */}
        <div className={styles["context"]}>{props.children}</div>
        {/* 按钮 */}
        <div className={styles["footer"]}>{renderFooter()}</div>
      </div>
    </Modal>
  );
};

export default CreateModal;
