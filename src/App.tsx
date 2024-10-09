import "./app.scss";
import { useState } from "react";
import { ReactVisualEditor } from "./packages/ReactVisualEditor";
import { visualEditorOption } from "./visual.config";
import "./iconfont.css";
import json from "./edit-data.json";
import { notification } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import LOGO from "./assets/logo";

export default () => {
  const [data, setData] = useState(json as any);
  const [formData, setFormData] = useState({
    name: "",
    username: "admin000",
    maxLevel: 100,
    minLevel: 0,
  });

  const customProps = {
    inputComponent: {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
      },
    },
    buttonComponent: {
      onClick: () => {
        notification.open({
          message: "执行提交逻辑，校验表单数据",
          description: JSON.stringify(formData),
        });
      },
    },
  };

  function goHome() {
    window.open("http://careteen.cn/", "_blank");
  }

  function goGithub() {
    window.open("https://github.com/careteenL/LuBan", "_blank");
  }

  return (
    <div className="app-home">
      <div className="app-home-header">
        <div>
          <img src={LOGO} className="app-home-header__logo" onClick={goHome} />
          <span>鲁班</span>
        </div>
        <GithubOutlined className="github" onClick={goGithub} />
      </div>
      <ReactVisualEditor
        value={data}
        onChange={setData}
        option={visualEditorOption}
        formData={formData}
        customProps={customProps}
        onFormDataChange={setFormData}
      />
      {/*<TestStaticCallback/>*/}
      {JSON.stringify(formData)}
    </div>
  );
};
