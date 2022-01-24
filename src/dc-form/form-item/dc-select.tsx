import {Select} from "antd";
import React, {useEffect, useState} from "react";
import { DcSelectProps } from "../interface/dc-select-props";
import { LabelValue } from "../interface";
import dcObserver from "../util/observer";


export default function DcSelect(props: DcSelectProps) {
  const {value, onChange, options, optionsIf, ...resProps} = props;
  const [optionList, setOptionList] = useState<LabelValue[]>([]);

  useEffect(() => {
    initOptionsIf();
    initOptions();
    return () => {
      optionsIf && dcObserver.unsubscribe(optionsIf.name, handleOption)
    }
  }, []);

  useEffect(() => {
    if (value && optionList.length && optionList.every(item => item.value !== (typeof value === 'string' ? value : value.value))) {
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
      dcObserver.subscribe(optionsIf.name, handleOption)
    }
  }

  function handleOption(res: any) {
    const options = optionsIf?.getOptions(res);
    if (Array.isArray(options)) {
      setOptionList(options);
    } else {
      options?.then(res => {
        setOptionList(res);
      })
    }
  }

  return <Select {...resProps} value={value} onChange={onChange} options={optionList}/>;
}
