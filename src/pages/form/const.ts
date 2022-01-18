import {DayType, Type} from "@/pages/form/config.enum";

function arrayList(num: number) {
  return Array.from({length: num}).map((item, index) => {
    return {
      label: `${index + 1}`,
      value: `${index + 1}`
    }
  })
}

function enum2options(obj: object) {
  return Object.entries(obj).map(([label, value]: [string, any]) => {
    return {
      label,
      value,
    }
  })
}
export const monthList = arrayList(12);

export const dayList = arrayList(31);

export const weekList = arrayList(7);

export const typeList = enum2options(Type);

export const dayTypeList = enum2options(DayType);
