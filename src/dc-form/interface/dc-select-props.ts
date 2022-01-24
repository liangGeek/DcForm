import { DcFormItemProps, LabelValue } from "./index";

export interface DcSelectProps extends DcFormItemProps {
  options?: (() => Promise<LabelValue[]>) | LabelValue[];
  optionsIf?: {
    name: string;
    getOptions: (value: any) => (Promise<LabelValue[]> | LabelValue[]);
  }
}
