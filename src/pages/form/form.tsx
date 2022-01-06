import DcForm from "@/component/dc-form/dc-form";
import { Button } from "antd";

export default function Page() {
  const config = {
    properties: [{
      widget: 'input',
      name: 'name',
      label: '姓名'
    }, {
      widget: 'number',
      name: 'age',
      label: '年龄'
    }],
    required: ['name', 'age']
  }

  function getForm() {

  }

  return (
    <div>
      <DcForm config={config} />
      <Button onClick={getForm}>click</Button>
    </div>
  );
}
