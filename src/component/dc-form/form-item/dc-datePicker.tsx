import {DatePicker} from "antd";
import {DcDatePickerProps} from "@/component/dc-form/interface/dc-datePicker-props";
import {useEffect, useState} from "react";
import moment, {Moment} from "moment";

export default function DcDatePicker(props: DcDatePickerProps) {
  const {value, onChange, format = 'YYYY-MM-DD'} = props;
  const [val, setVal] = useState<Moment>();

  useEffect(() => {
    setVal(value && moment(value));
  }, [value])

  function changeValue(e: any) {
    onChange?.(e?.format(format));
  }

  return <DatePicker value={val} onChange={changeValue}/>
}
