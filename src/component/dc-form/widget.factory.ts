import {InputNumber} from 'antd';
import DcInput from "@/component/dc-form/form-item/dc-input";
import DcSelect from "@/component/dc-form/form-item/dc-select";
import DcRadio from "@/component/dc-form/form-item/dc-radio";
import DcCheckbox from "@/component/dc-form/form-item/dc-checkbox";
import DcDatePicker from "@/component/dc-form/form-item/dc-datePicker";
import DcTimePicker from "@/component/dc-form/form-item/dc-timePicker";

const widgets: any = {};

export default class WidgetFactory {

  constructor() {
    this.register('input', DcInput);
    this.register('number', InputNumber);
    this.register('select', DcSelect);
    this.register('radio', DcRadio);
    this.register('checkbox', DcCheckbox);
    this.register('datePicker', DcDatePicker);
    this.register('timePicker', DcTimePicker);
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
