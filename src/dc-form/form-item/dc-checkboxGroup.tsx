import {Checkbox} from "antd";
import {useEffect, useState} from "react";
import { DcCheckboxGroupProps } from "../interface/dc-checkboxGroup-props";
import { LabelValue } from "../interface";
import dcObserver from "../util/observer";
import React from "react";

export default function DcCheckboxGroup(props: DcCheckboxGroupProps) {
  const {value, onChange, options, optionsIf, ...resProps} = props;
  const [optionList, setOptionList] = useState<LabelValue[]>([]);

  useEffect(() => {
    initOptionsIf();
    initOptions();
    return () => {
      optionsIf && dcObserver.unsubscribe(optionsIf.name, handleOption)
    }
  }, []);

  // useEffect(() => {
  //   if (value && optionList.length && value.some(item => !optionList.map(item => item.value).includes(item))) {
  //     onChange?.(null);
  //   }
  // }, [optionList, value])

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
    const opts = optionsIf?.getOptions(res) || [];
    setOptionList((list) => {
      if (list.length > 0) {
        onChange?.(null);
      }
      return opts
    });
  }

  return <Checkbox.Group {...resProps} className={'dc-checkbox'} value={value} onChange={onChange} options={optionList}/>;
}
