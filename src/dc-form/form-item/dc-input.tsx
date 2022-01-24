import {Input} from "antd";
import React from "react";
import { DcFormItemProps } from "../interface";

export default function DcInput(props: DcFormItemProps) {
  const {value, onChange, ...resProps} = props;

  return <Input {...resProps} value={value} onChange={(e: any) => onChange?.(e.target.value)}/>
}
