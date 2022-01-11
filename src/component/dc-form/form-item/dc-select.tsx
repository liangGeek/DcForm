import { Select } from "antd";
import { DcSelectProps } from "@/component/dc-form/interface/dc-select-props";
import { useEffect, useState } from "react";
import { LabelValue } from "@/component/dc-form/interface/interface";
import dcObserver from "@/component/dc-form/util/observer";

export default function DcSelect(props: DcSelectProps) {
  const { value, onChange, options, optionsIf } = props;
  const [optionList, setOptionList] = useState<LabelValue[]>([]);

  useEffect(() => {
    initOptionsIf();
    initOptions();
  }, []);

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
        onChange?.('')
        setOptionList(opts);
      })
    }
  }

  return <Select value={value} onChange={onChange} options={optionList}	/>;
}
