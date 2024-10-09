import type { ChangeEvent } from "react";
import { useState } from "react";
import type { FormInstance } from "antd";
import { Form, Input } from "antd";
import {
  sliceFullLen,
  validateFullLength,
  getFullLength,
  validateJsStringLength,
} from "./utils";
import type { ProFormItemWithCountProps } from "./type";
import "antd/es/input/style/index";
import "./index.less";
import is from "@sindresorhus/is";
import type { InputProps, TextAreaProps } from "antd/lib/input";
import classNames from "classnames";

const { TextArea } = Input;

const FormItemWithWordCount: React.FC<ProFormItemWithCountProps> = (props) => {
  const {
    name,
    maxCount,
    inputStyle,
    isTextarea,
    clip,
    onlyChineseAsTwo,
    status,
    viewValue,
    inputProps,
    placeholder,
    getFieldValueName,
  } = props;
  const maxLength = 2 * maxCount;
  // isComposition：是否为正在拼音中（如果true，则不触发字数校验，避免校验报错跳动）
  const [isComposition, setIsComposition] = useState(false);

  const rootCls = classNames("form-item-with-count", status);

  const onChangeValue = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    setFieldsValue: FormInstance["setFieldsValue"]
  ) => {
    // 下为张僮写的裁切（clip）逻辑：if clip = true, 超过最长字数后自动裁切
    const value = e.target?.value || "";
    if (
      (clip && onlyChineseAsTwo && getFullLength(value) > maxCount) ||
      (clip && !onlyChineseAsTwo && value.length > maxCount)
    ) {
      const validValue = onlyChineseAsTwo
        ? sliceFullLen(value, maxCount)
        : value.slice(0, maxCount);
      // WARN: 没处理 getFieldValueName
      setFieldsValue({ [name]: validValue });
    }
  };

  const onCompositionStart = () => {
    setIsComposition(true);
  };
  const onCompositionEnd = (validateFields: FormInstance["validateFields"]) => {
    setIsComposition(false);
    validateFields([getFieldValueName || name]); // 因为异步的执行时机问题，这里需要手动触发校验
  };

  return (
    <Form.Item
      label={props.label}
      shouldUpdate
      required={props.required}
      {...props.extraOuterItem}
    >
      {({ getFieldValue, setFieldsValue, validateFields }) => {
        const currentVal = getFieldValue(getFieldValueName || name) || "";
        const currentLen =
          (onlyChineseAsTwo && getFullLength(currentVal)) || currentVal.length;

        return (
          <div className={rootCls}>
            <Form.Item
              className="inner-form-item"
              name={status === "edit" ? name : undefined}
              validateFirst
              {...props.extraInnerItem}
              rules={[
                {
                  required: props.required,
                  message: `请输入${props.label}`,
                },
                {
                  validator: (_, value) => {
                    if (is.nullOrUndefined(value)) return Promise.resolve();
                    if (isComposition) return Promise.resolve(); // 正在拼音中，不触发字数校验，避免校验报错跳动：ZHAC-4196

                    if (onlyChineseAsTwo) {
                      return validateFullLength(
                        _,
                        value,
                        0,
                        maxCount,
                        `${props.label}不超过${maxCount}字符，每个汉字计2字符`
                      );
                    }
                    return validateJsStringLength(
                      _,
                      value,
                      0,
                      maxCount,
                      `${props.label}不超过${maxCount}字符`
                    );
                  },
                },
                ...(props.extraInnerItem?.rules || []),
              ]}
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {status === "view" ? (
                viewValue
              ) : isTextarea ? (
                <TextArea
                  className="input-inner-drawer"
                  placeholder={placeholder}
                  maxLength={maxLength}
                  style={inputStyle}
                  onChange={(e) => {
                    onChangeValue(e, setFieldsValue);
                  }}
                  onCompositionStart={onCompositionStart}
                  onCompositionEnd={() => {
                    onCompositionEnd(validateFields);
                  }}
                  {...(inputProps as TextAreaProps)}
                />
              ) : (
                <Input
                  className="input-inner-drawer"
                  placeholder={placeholder}
                  maxLength={maxLength}
                  style={inputStyle}
                  onChange={(e) => {
                    onChangeValue(e, setFieldsValue);
                  }}
                  onCompositionStart={onCompositionStart}
                  onCompositionEnd={() => {
                    onCompositionEnd(validateFields);
                  }}
                  {...(inputProps as InputProps)}
                />
              )}
            </Form.Item>
            {status === "view" ? null : (
              <span className="real-time-text">
                {currentLen}/{maxCount}
              </span>
            )}
          </div>
        );
      }}
    </Form.Item>
  );
};

FormItemWithWordCount.defaultProps = {
  status: "edit",
  placeholder: "请输入",
};

export default FormItemWithWordCount;
