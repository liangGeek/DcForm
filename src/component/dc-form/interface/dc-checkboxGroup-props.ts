import { DcFormItemProps, LabelValue } from "@/component/dc-form/interface/interface";

export interface DcCheckboxGroupProps extends DcFormItemProps {
  value?: any[];
  options?: (() => Promise<LabelValue[]>) | LabelValue[];
  optionsIf?: {
    name: string;
    getOptions: (value: any) => LabelValue[];
  }
}
