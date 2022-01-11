import { DcFormItemProps, LabelValue } from "@/component/dc-form/interface/interface";

export interface DcSelectProps extends DcFormItemProps {
  options?: (() => Promise<LabelValue[]>) | LabelValue[];
  optionsIf?: {
    name: string;
    getOptions: (value: any) => LabelValue[];
  }
}
