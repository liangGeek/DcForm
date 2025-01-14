import {Col, Form, Row} from "antd";
import React, {useEffect, useImperativeHandle, useState} from "react";
import {DcFormProps, DcFormRefProps, FormItem} from "./interface";
import dcObserver from "./util/observer";
import {Rule} from "antd/lib/form";
import "./index.less";
import widgetFactory from "./widget.factory";

const DcForm = React.forwardRef<DcFormRefProps, DcFormProps>((props, ref) => {
  const {config, initialValues = {}} = props;
  const {required, name, ui = {}, autoComplete, preserve} = config;
  const {labelCol, wrapperCol, layout, itemCol} = ui;
  const [list, setList] = useState<FormItem[]>([]);
  const [dcForm] = Form.useForm();

  useImperativeHandle(ref, () => ({
    form: dcForm
  }));

  useEffect(() => {
    dataTrigger();
    initForm();
    initObserver();
  }, []);

  function initObserver() {
    let properties: FormItem[] = config.properties;
    properties.forEach(item => {
      if (item.if) {
        const conditions: boolean[] = Array.from({length: Object.keys(item.if).length});
        Object.entries(item.if).forEach(([key, values]: [string, string[]], index) => {
          dcObserver.subscribe(key, (res: any) => {
            if (values.includes(res)) {
              conditions[index] = true;
              if (conditions.every(item => item)) {
                setList((list) => {
                  if (list.every(i => i.name !== item.name)) {
                    dcObserver.publish(item.name, res);
                    return [...list, item].sort((item1, item2) => Number(item1.weight) - Number(item2.weight));
                  }
                  return list;
                });
              }
            } else {
              conditions[index] = false;
              dcObserver.publish(item.name, null);
              setList((list) => list.filter(i => i.name !== item.name));
            }
          });
        })
      }
    });
  }

  function dataTrigger() {
    Object.entries(initialValues).forEach(([key, value]: [string, any]) => {
      dcObserver.publish(key, value);
    })
  }

  function initForm() {
    let properties: FormItem[] = config.properties;
    properties = properties.filter(item => {
      if (!item.if) {
        return true;
      }
      return Object.entries(item.if).every(([key, values]: [string, string[]]) => {
        return values.includes(initialValues?.[key]);
      });
    });
    setList(() => properties.sort((item1, item2) => Number(item1.weight) - Number(item2.weight)));
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
      <Row>
        {list.map((item) => {
          const Widget = widgetFactory.getType(item.widget);
          let rules: Rule[] = [];
          if (!Widget) {
            return `${item.widget}控件不存在`;
          }
          if (required && required.includes(item.name)) {
            if (!item.rules) {
              item.rules = [];
            }
            rules = [...item.rules, {required: true, message: `${item.label}为必填项`}];
          }

          return (
            <Col span={item.ui?.itemCol?.span ?? itemCol?.span ?? 24} key={item.name}>
              <Form.Item
                label={item.label}
                name={item.name}
                rules={rules}
                hidden={item.ui?.hidden}
              >
                <Widget {...item.props} onChange={(value: any) => changeValue(item.name, value)}/>
              </Form.Item>
            </Col>
          );
        })}
      </Row>

    </Form>
  );
})

export default DcForm;
