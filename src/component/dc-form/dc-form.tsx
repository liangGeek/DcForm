import {Form} from 'antd';
import React, {useEffect, useImperativeHandle, useState} from 'react';
import {DcFormProps, DcFormRefProps, FormItem} from './interface';
import WidgetFactory from './widget.factory';
import dcObserver from "@/component/dc-form/util/observer";

const DcForm = React.forwardRef<DcFormRefProps, DcFormProps>((props, ref) => {
  const {config, initialValues} = props;
  const {required, name, ui = {}, autoComplete, preserve} = config;
  const {labelCol, wrapperCol, layout} = ui;
  const [list, setList] = useState<FormItem[]>([]);
  const [dcForm] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form: dcForm,
  }));

  useEffect(() => {
    initForm();
  }, []);

  function initForm() {
    let properties: FormItem[] = config.properties;
    properties = properties.filter(item => {
      if (!item.if) {
        return true;
      }
      return Object.entries(item.if).every(([key, values]: [string, string[]]) => {
        dcObserver.subscribe(key, (res: any) => {
          if (values.includes(res)) {
            if (list.every(i => i.name !== item.name)) {
              setList((list) => [...list, item]);
            }
          } else {
            dcObserver.publish(item.name, '');
            setList((list) => [...list.filter(i => i.name !== item.name)])
          }
        })
        return values.includes(initialValues?.[key]);
      })
    })
    setList(properties.sort((item1, item2) => Number(item1.weight) - Number(item2.weight)));
  }

  function changeValue(name: string, value: any) {
    dcObserver.publish(name, value);
  }

  return (
    <Form
      form={dcForm}
      name={name}
      layout={layout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
      preserve={preserve}
      autoComplete={autoComplete}
      initialValues={initialValues}
    >
      {list.map((item) => {
        const widgetFactory = new WidgetFactory();
        const Widget = widgetFactory.getType(item.widget);
        if (!Widget) {
          return `${item.widget}控件`;
        }
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
            <Widget {...item.props} onChange={(value: any) => changeValue(item.name, value)} />
          </Form.Item>
        );
      })}
    </Form>
  );
})

export default DcForm;
