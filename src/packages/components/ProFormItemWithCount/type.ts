import type { InputProps } from 'antd';
import type { FormItemProps } from 'antd/lib/form/FormItem';
import type { NamePath } from 'antd/lib/form/interface';
import type { TextAreaProps } from 'antd/lib/input';

export interface ProFormItemWithCountProps {
  /**
   * @description 最大字符数
   * @type {number}
   */
  maxCount: number;
  label: string;
  name: string;
  /**
   * @tutorial getFieldValue函数的参数，用于Form.List下的Form.Item
   * @description
   * Form.List 下的 Form.Item，其 name 和 getFieldValue 时取的 name 不一样
   *  如，Form.List 的 name 为 'phones'，其下 Form.Item 的 name 为 0、1、2 之类的数字
   *   getFieldValue 要取 ['phones', 0]
   */
  getFieldValueName?: NamePath;
  required?: boolean;
  placeholder?: string;
  extraOuterItem?: FormItemProps;
  extraInnerItem?: FormItemProps;
  inputProps?: InputProps | TextAreaProps;
  /**
   * @description input 框的 style
   * @type {React.CSSProperties}
   */
  inputStyle?: React.CSSProperties;
  /**
   * @description 是否为 textarea
   * @default false
   * @type {boolean}
   */
  isTextarea?: boolean;
  clip?: boolean;
  onlyChineseAsTwo?: boolean;

  /**
   * @description
   * @default 'edit'
   * @type {('edit' | 'view')}
   */
  status?: 'edit' | 'view';
  viewValue?: string | number;
}
