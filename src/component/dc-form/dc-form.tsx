import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { DcFormProps, FormItem } from './interface';
import WidgetFactory from './widget.factory';

export default function DcForm(props: DcFormProps) {
  const { config } = props;
  const { required, name, ui = {}, autoComplete } = config;
  const { labelCol, wrapperCol, layout } = ui;
  const [list, setList] = useState<FormItem[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const list: FormItem[] = config.properties;
    setList(list);
  }, []);

  return (
    <Form
      form={form}
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
}
