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
  ui?: {
    labelCol?: ColProps;
    wrapperCol?: ColProps;
  }
}
