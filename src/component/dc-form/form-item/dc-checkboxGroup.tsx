import {Checkbox} from "antd";
import {useEffect, useState} from "react";
import {LabelValue} from "@/component/dc-form/interface/interface";
import dcObserver from "@/component/dc-form/util/observer";
import {DcCheckboxGroupProps} from "@/component/dc-form/interface/dc-checkboxGroup-props";

export default function DcCheckboxGroup(props: DcCheckboxGroupProps) {
  const {value, onChange, options, optionsIf} = props;
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

  return <Checkbox.Group className={'dc-checkbox'} value={value} onChange={onChange} options={optionList}/>;
}
