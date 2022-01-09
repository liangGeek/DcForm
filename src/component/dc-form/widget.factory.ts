import { Input, InputNumber, Select } from 'antd';
import DcInput from "@/component/dc-form/form-item/dc-input";

const widgets: any = {};

export default class WidgetFactory {

  constructor() {
    this.register('input', DcInput);
    this.register('number', InputNumber);
    this.register('select', Select);
  }

  getWidgets(): any {
    return widgets;
  }

  register(type: string, widget: any): void {
    widgets[type] = widget;
  }

  has(type: string): boolean {
    return widgets.hasOwnProperty(type);
  }

  getType(type: string): any {
    if (this.has(type)) {
      return widgets[type];
    }
  }
}
