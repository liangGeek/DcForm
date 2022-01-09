import {DcFormConfig} from "@/component/dc-form/interface";

export const FormConfig: DcFormConfig = {
  properties: [
    {
      widget: 'select',
      name: 'type',
      label: '类型',
      weight: 1,
      props: {
        options: [{
          value: '1',
          label: '人员'
        }, {
          value: '2',
          label: '机构'
        }]
      }
    },
    {
      widget: 'input',
      name: 'name',
      label: '姓名',
      weight: 10,
      if: {
        type: ['1']
      }
    }, {
      widget: 'number',
      name: 'age',
      label: '年龄',
      weight: 11,
      if: {
        type: ['1']
      }
    }, {
      widget: 'input',
      name: 'orgName',
      label: '机构名称',
      weight: 13,
      if: {
        type: ['2']
      }
    }, {
      widget: 'number',
      name: 'orgId',
      label: '机构id',
      weight: 14,
      if: {
        type: ['2']
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
  required: ['name', 'age', 'orgName', 'orgId'],
  autoComplete: 'off',
  preserve: false
}
