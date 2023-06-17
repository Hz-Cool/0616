/**
 * 系统共用参数
 */

// 所有平台
export const platformList = [
  {
    id: 1,
    name: '天猫',
  },
  {
    id: 2,
    name: '京东',
  }
];

// 标签等级
export const TagLevel = [
  {
    id: 1,
    name: '一级标签',
  },
  {
    id: 2,
    name: '二级标签',
  },
  {
    id: 3,
    name: '三级标签',
  },
  {
    id: 4,
    name: '四级标签',
  },
]

// 品类广场下 FormList
export const Dash_FormList = [
  {
    // placeholder: '请选择价位',
    placeholder: '价位',
    field: 't3',
    value: null,
    option: [],
  },
  {
    // placeholder: '请选择品牌属地',
    placeholder: '品牌属地',
    field: 't4',
    value: null,
    option: [],
  },
  {
    // placeholder: '请选择品牌属性',
    placeholder: '品牌属性',
    field: 't5',
    value: null,
    multiple: true,
    option: [],
  },
  {
    // placeholder: '请选择适用对象',
    placeholder: '适用对象',
    field: 't6',
    value: null,
    option: [],
  },
  {
    // placeholder: '请选择平台',
    placeholder: '平台',
    field: 'platform',
    value: null,
    option: platformList,
  },
]


// 下拉筛选豪秒
export const TimeoutTimer = 300;


// 商品属性
export const SKUDetailList = [
  {
    id: 1,
    name: "品牌",
    value: "-",
  },
  {
    id: 2,
    name: "品类",
    value: "-",
  },
  {
    id: 3,
    name: "类目",
    value: "-",
  },
];

// 缩放系数
export const zoom = {
  window: 0.1,
  mac: 0.3,
}

export default {};
