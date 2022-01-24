import {DatePicker} from "antd";
import {useEffect, useState} from "react";
import moment, {Moment} from "moment";
import { DcDatePickerProps } from "../interface/dc-datePicker-props";
import React from "react";

export default function DcDatePicker(props: DcDatePickerProps) {
  const {value, onChange, format = 'YYYY-MM-DD', ...resProps} = props;
  const [val, setVal] = useState<Moment>();

  useEffect(() => {
    setVal(value && moment(value));
  }, [value])

  function changeValue(e: any) {
    onChange?.(e?.format(format));
  }

  return <DatePicker {...resProps} value={val} onChange={changeValue}/>
}
