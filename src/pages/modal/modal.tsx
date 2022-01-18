import {Button, Modal} from "antd";
import {useRef, useState} from "react";
import DcForm from "@/component/dc-form/dc-form";
import {FormConfig} from "@/pages/form/config";
import {DcFormRefProps} from "@/component/dc-form/interface/interface";

export default function () {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const form = useRef<DcFormRefProps>(null);
  const initialValues = {
    type: '1',
    dayType: '1',
    months: ['1', '2'],
    days: ['2', '3']
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.current?.form.validateFields().then(res => {
      setIsModalVisible(false);
      console.log(res)
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return <>
    <Button type="primary" onClick={showModal}>
      Open Modal
    </Button>
    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <DcForm config={FormConfig} ref={form} initialValues={initialValues}/>
    </Modal>
  </>
}
