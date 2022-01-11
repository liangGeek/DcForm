import { DcFormConfig } from "@/component/dc-form/interface/interface";

export const FormConfig: DcFormConfig = {
  properties: [
    {
      widget: "radio",
      name: "type",
      label: "类型",
      weight: 1,
      props: {
        options: [{
          value: "1",
          label: "人员"
        }, {
          value: "2",
          label: "机构"
        }]
      }
    },
    {
      widget: 'datePicker',
      name: 'date',
      label: '日期'
    },
    {
      widget: 'timePicker',
      name: 'time',
      label: '时间'
    },
    {
      widget: 'checkbox',
      name: 'day',
      label: '天',
      props: {
        optionsIf: {
          name: 'type',
          getOptions: (value: any) => {
            if (value === '1') {
              return [{value: '1', label: '星期1'}, {value: '2', label: '星期2'}]
            } else {
              return [{value: '3', label: '星期3'}, {value: '4', label: '星期4'}]
            }
          }
        }
      }
    },
    {
      widget: "select",
      name: "show",
      label: "显示身高",
      weight: 1,
      props: {
        // options: () => {
        //   return new Promise(resolve => {
        //     setTimeout(() => {
        //       resolve([
        //         {value: '1', label: '显示'},
        //         {value: '0', label: '隐藏'},
        //       ])
        //     }, 2000)
        //   })
        // },
        optionsIf: {
          name: 'type',
          getOptions: (value: any) => {
            if (value === '1') {
              return [{value: '1', label: '显示'}, {value: '0', label: '隐藏'}]
            } else {
              return [{value: '2', label: '显示1'}, {value: '3', label: '隐藏1'}]
            }
          }
        }
      }
    },
    {
      widget: "input",
      name: "name",
      label: "姓名",
      weight: 10,
      if: {
        type: ["1"]
      }
    }, {
      widget: "number",
      name: "age",
      label: "年龄",
      weight: 11,
      if: {
        type: ["1"]
      }
    }, {
      widget: "number",
      name: "height",
      label: "身高",
      weight: 11,
      if: {
        show: ["1"]
      }
    }, {
      widget: "input",
      name: "orgName",
      label: "机构名称",
      weight: 13,
      if: {
        type: ["2"]
      }
    }, {
      widget: "number",
      name: "orgId",
      label: "机构id",
      weight: 14,
      if: {
        type: ["2"]
      }
    }
  ],
  ui: {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 8
    }
  },
  required: [],
  autoComplete: "off",
  preserve: false
};
