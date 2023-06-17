import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import i18next from "i18next";

const LangSwitch = () => {
  const [lang, setLang] = useState("en");
  useEffect(() => {
    setLang(localStorage.getItem("lang"));
  }, []);

  useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);

  const onChange = (e) => {
    let val = e ? "en" : "zh-CN";
    setLang(val);
    localStorage.setItem("lang", val);
    location.reload();
  };

  return (
    <Switch
      checkedChildren="English"
      unCheckedChildren="中文"
      checked={lang === "en"}
      onChange={onChange}
    />
  );
};

export default LangSwitch;
