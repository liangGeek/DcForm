import {Radio} from "antd";
import {DcRadioProps} from "@/component/dc-form/interface/dc-radio-props";
import {useEffect, useState} from "react";
import {LabelValue} from "@/component/dc-form/interface/interface";
import dcObserver from "@/component/dc-form/util/observer";

export default function DcRadio(props: DcRadioProps) {
  const {value, onChange, options, optionsIf} = props;
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
      dcObserver.subscribe(optionsIf.name, (res) => {
        const opts = optionsIf.getOptions(res);
        setOptionList(opts);
      })
    }
  }

  function changeValue(e: any) {
    onChange?.(e.target.value);
  }

  return <Radio.Group value={value} onChange={changeValue} options={optionList}/>;

}
