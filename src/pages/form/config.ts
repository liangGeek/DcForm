import {DcFormConfig} from "@/component/dc-form/interface/interface";
import {dayList, dayTypeList, monthList, typeList, weekList} from "@/pages/form/const";
import {DayType, Type} from "@/pages/form/config.enum";

export const FormConfig: DcFormConfig = {
  properties: [
    {
      widget: "radio",
      name: "type",
      label: "选择方式",
      weight: 1,
      props: {
        options: typeList
      }
    },
    {
      widget: 'checkbox',
      name: 'months',
      label: '选择月',
      weight: 2,
      if: {
        type: [Type.定时]
      },
      props: {
        options: monthList
      }
    },
    {
      widget: "radio",
      name: "dayType",
      label: "选择方式",
      weight: 3,
      if: {
        type: [Type.定时]
      },
      props: {
        options: dayTypeList
      }
    },
    {
      widget: 'checkbox',
      name: 'days',
      label: '天',
      if: {
        type: [Type.定时],
        dayType: [DayType.按星期, DayType.按日期]
      },
      weight: 4,
      props: {
        optionsIf: {
          name: 'dayType',
          getOptions: (value: any) => {
            if (value === DayType.按日期) {
              return dayList;
            } else {
              return weekList;
            }
          }
        }
      }
    },
    {
      widget: "timePicker",
      name: "time",
      label: "选择时分",
      weight: 10,
      if: {
        type: [Type.定时]
      },
    },
    {
      widget: "datePicker",
      name: "date",
      label: "选择日期",
      weight: 10,
      if: {
        type: [Type.循环]
      },
    },
    {
      widget: "input",
      name: "cron",
      label: "cron表达式",
      weight: 10,
      if: {
        type: [Type.自定义]
      },
    }
  ],
  ui: {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 16
    }
  },
  required: ['type', 'dayType', 'months', 'days', 'time'],
  autoComplete: "off",
  preserve: false
};
