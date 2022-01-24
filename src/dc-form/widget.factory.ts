import {InputNumber} from 'antd';
import DcCheckboxGroup from './form-item/dc-checkboxGroup';
import DcDatePicker from './form-item/dc-datePicker';
import DcInput from './form-item/dc-input';
import DcRadio from './form-item/dc-radio';
import DcSelect from './form-item/dc-select';
import DcTimePicker from './form-item/dc-timePicker';
import {WidgetType} from './enum/widget';


class WidgetFactory {
  widgets: any = {};

  constructor() {
    this.register(WidgetType.输入框, DcInput);
    this.register(WidgetType.数字输入框, InputNumber);
    this.register(WidgetType.下拉选择, DcSelect);
    this.register(WidgetType.单选框, DcRadio);
    this.register(WidgetType.多选框, DcCheckboxGroup);
    this.register(WidgetType.日期选择框, DcDatePicker);
    this.register(WidgetType.时间选择框, DcTimePicker);
  }

  getWidgets(): any {
    return this.widgets;
  }

  register(type: string, widget: any): void {
    this.widgets[type] = widget;
  }

  has(type: string): boolean {
    return this.widgets.hasOwnProperty(type);
  }

  getType(type: string): any {
    if (this.has(type)) {
      return this.widgets[type];
    }
  }
}
const widgetFactory = new WidgetFactory();
export default widgetFactory;
