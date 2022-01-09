import { Form } from 'antd';
import React, {Ref, useEffect, useImperativeHandle, useState} from 'react';
import {DcFormProps, DcFormRefProps, FormItem} from './interface';
import WidgetFactory from './widget.factory';

const DcForm = React.forwardRef<DcFormRefProps, DcFormProps>((props, ref) => {
  const { config } = props;
  const { required, name, ui = {}, autoComplete } = config;
  const { labelCol, wrapperCol, layout } = ui;
  const [list, setList] = useState<FormItem[]>([]);
  const [dcForm] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form: dcForm,
  }));

  useEffect(() => {
    const list: FormItem[] = config.properties;
    setList(list.sort((item1, item2) => Number(item1.weight) - Number(item2.weight)));
  }, []);

  return (
    <Form
      form={dcForm}
      name={name}
      layout={layout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      autoComplete={autoComplete}
    >
      {list.map((item) => {
        const widgetFactory = new WidgetFactory();
        const Widget = widgetFactory.getType(item.widget);
        if (required && required.includes(item.name)) {
          if (!item.rules) {
            item.rules = [];
          }
          item.rules.push({required: true, message: `${item.label}为必填项`});
        }

        return (
          <Form.Item
            key={item.name}
            label={item.label}
            name={item.name}
            rules={item.rules}
          >
            <Widget />
          </Form.Item>
        );
      })}
    </Form>
  );
})

export default DcForm;
