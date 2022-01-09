import DcForm from "@/component/dc-form/dc-form";
import {Button} from "antd";
import {useRef} from "react";
import {DcFormRefProps} from "@/component/dc-form/interface";

export default function Page() {
  const form = useRef<DcFormRefProps>(null);
  const config = {
    properties: [{
      widget: 'input',
      name: 'name',
      label: '姓名',
      weight: 1,
    }, {
      widget: 'number',
      name: 'age',
      label: '年龄',
      weight: 1,
    }],
    required: ['name', 'age']
  }

  function getForm() {
    form.current?.form.validateFields().then(res => {
      console.log(res)
    })
  }

  return (
    <div>
      <DcForm config={config} ref={form}/>
      <Button onClick={getForm}>click</Button>
    </div>
  );
}
