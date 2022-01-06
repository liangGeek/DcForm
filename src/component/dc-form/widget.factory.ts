import { Input, InputNumber } from 'antd';

const widgets: any = {};

export default class WidgetFactory {

  constructor() {
    this.register('input', Input);
    this.register('number', InputNumber);
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