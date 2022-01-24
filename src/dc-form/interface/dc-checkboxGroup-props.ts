import { DcFormItemProps, LabelValue } from "./index";

export interface DcCheckboxGroupProps extends DcFormItemProps {
  value?: any[];
  options?: (() => Promise<LabelValue[]>) | LabelValue[];
  optionsIf?: {
    name: string;
    getOptions: (value: any) => LabelValue[];
  }
}
