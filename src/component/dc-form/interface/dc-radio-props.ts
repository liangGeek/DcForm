import { DcFormItemProps, LabelValue } from "@/component/dc-form/interface/interface";

export interface DcRadioProps extends DcFormItemProps {
  options?: (() => Promise<LabelValue[]>) | LabelValue[];
  optionsIf?: {
    name: string;
    getOptions: (value: any) => LabelValue[];
  }
}
