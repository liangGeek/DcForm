import {Input} from "antd";
import {DcFormItemProps} from "@/component/dc-form/interface/interface";

export default function DcInput(props: DcFormItemProps) {
  const {value, onChange} = props;

  return <Input value={value} onChange={(e: any) => onChange?.(e.target.value)}/>
}
