import { DcFormItemProps, LabelValue } from "@/component/dc-form/interface/interface";

export interface DcCheckboxProps extends DcFormItemProps {
  value?: any[];
  options?: (() => Promise<LabelValue[]>) | LabelValue[];
  optionsIf?: {
    name: string;
    getOptions: (value: any) => LabelValue[];
  }
}
