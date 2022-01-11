import {Rule} from "antd/lib/form";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {ColProps} from "antd/es/grid/col";
import {FormLayout} from "antd/lib/form/Form";
import {FormInstance} from "antd/lib/form/hooks/useForm";

export interface DcFormRefProps {
  form: FormInstance;
}

export interface DcFormProps {
  config: DcFormConfig;
  initialValues?: any;
}

export interface DcFormItemProps {
  value?: any;
  onChange?: (res: any) => void;
}

export interface DcFormConfig {
  properties: FormItem[];
  name?: string;
  required?: string[];
  ui?: {
    layout?: FormLayout,
    labelCol?: ColProps;
    wrapperCol?: ColProps;
  },
  autoComplete?: 'off' | 'on';
  preserve?: boolean;
  size?: SizeType
}

export interface FormItem {
  name: string;
  widget: string;
  label?: string;
  rules?: Rule[];
  weight?: number;
  props?: any;
  ui?: {
    labelCol?: ColProps;
    wrapperCol?: ColProps;
  },
  if?: {
    [key: string]: string[]
  }
}

export interface DcObserver {
  observerList: {[key: string]: any[]};
  historyList: {[key: string]: any[]};
  subscribe: (name: string, fn: (res: any) => void) => void;
  publish: (name: string, res: any) => void;
  unsubscribe: (name: string) => void;
}

export interface LabelValue {
  label: string;
  value: any;
}
