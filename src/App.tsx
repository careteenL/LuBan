import "./app.scss";
import { useState } from "react";
import { ReactVisualEditor } from "./packages/ReactVisualEditor";
import { visualEditorOption } from "./visual.config";
import "./iconfont.css";
import json from "./edit-data.json";
import { notification } from "antd";

const LOGO = "https://res.bodiantech.cn/front-end/fe-node/logo/v2/pc_logo.png";

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

  return (
    <div className="app-home">
      <div className="app-home-header">
        <img src={LOGO} className="app-home-header__logo" />
        <span>智慧案场-鲁班</span>
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
