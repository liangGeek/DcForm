import DcForm from "@/component/dc-form/dc-form";
import {Button} from "antd";
import {useRef} from "react";
import {DcFormRefProps} from "@/component/dc-form/interface/interface";
import {FormConfig} from "@/pages/form/config";

export default function Page() {
  const form = useRef<DcFormRefProps>(null);
  const initialValues = {
    type: '1'
  }

  function getForm() {
    form.current?.form.validateFields().then(res => {
      console.log(res)
    })
  }

  return (
    <div>
      <DcForm config={FormConfig} ref={form} initialValues={initialValues}/>
      <Button onClick={getForm}>click</Button>
    </div>
  );
}
