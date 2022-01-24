import {Radio} from "antd";
import React, {useEffect, useState} from "react";
import { DcRadioProps } from "../interface/dc-radio-props";
import { LabelValue } from "../interface";
import dcObserver from "../util/observer";

export default function DcRadio(props: DcRadioProps) {
  const {value, onChange, options, optionsIf, ...resProps} = props;
  const [optionList, setOptionList] = useState<LabelValue[]>([]);

  useEffect(() => {
    initOptionsIf();
    initOptions();
  }, []);

  useEffect(() => {
    if (value && optionList.length && optionList.every(item => item.value !== value)) {
      onChange?.(null);
    }
  }, [optionList, value])

  function initOptions() {
    if (Array.isArray(options)) {
      setOptionList(options);
    } else {
      options?.().then(res => {
        setOptionList(res);
      })
    }
  }

  function initOptionsIf() {
    if (optionsIf) {
      dcObserver.subscribe(optionsIf.name, (res: any) => {
        const opts = optionsIf.getOptions(res);
        setOptionList(opts);
      })
    }
  }

  function changeValue(e: any) {
    onChange?.(e.target.value);
  }

  return <Radio.Group {...resProps} value={value} onChange={changeValue} options={optionList}/>;

}
