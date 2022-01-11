import {Checkbox} from "antd";
import {useEffect, useState} from "react";
import {LabelValue} from "@/component/dc-form/interface/interface";
import dcObserver from "@/component/dc-form/util/observer";
import {DcCheckboxProps} from "@/component/dc-form/interface/dc-checkbox-props";

export default function DcCheckbox(props: DcCheckboxProps) {
  const {value, onChange, options, optionsIf} = props;
  const [optionList, setOptionList] = useState<LabelValue[]>([]);

  useEffect(() => {
    initOptionsIf();
    initOptions();
  }, []);

  useEffect(() => {
    if (value && optionList.length && value.some(item => !optionList.map(item => item.value).includes(item))) {
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
      dcObserver.subscribe(optionsIf.name, (res) => {
        const opts = optionsIf.getOptions(res);
        setOptionList(opts);
      })
    }
  }

  return <Checkbox.Group value={value} onChange={onChange} options={optionList}/>;
}
