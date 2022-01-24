import {TimePicker} from "antd";
import React, {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import { DcTimePickerProps } from "../interface/dc-timePicker-props";

export default function DcTimePicker(props: DcTimePickerProps) {
  const {value, onChange, format = 'HH:mm:ss', ...resProps} = props;
  const [val, setVal] = useState<Moment>();

  useEffect(() => {
    setVal(value && moment(value, format));
  }, [value])

  function changeValue(e: any) {
    onChange?.(e?.format(format));
  }

  return <TimePicker {...resProps} value={val} onChange={changeValue}/>
}
