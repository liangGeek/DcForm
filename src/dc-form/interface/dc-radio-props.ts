import { DcFormItemProps, LabelValue } from "./index";

export interface DcRadioProps extends DcFormItemProps {
  options?: (() => Promise<LabelValue[]>) | LabelValue[];
  optionsIf?: {
    name: string;
    getOptions: (value: any) => LabelValue[];
  }
}
