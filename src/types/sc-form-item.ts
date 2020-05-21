import {EnFormItemType} from './enum';

interface option {
  label: string,//显示文案
  value: string | number | object | Array<any>,//值
}

export default interface IfScFormItem {
  label?: string;//显示文案
  model: string;//表单绑定的v-model的key
  EnFormItemType: EnFormItemType;//表单成员类型
  options?: Array<option>;//下拉或多选类容
  elType?: string | number;// 组件自身的type
  placeholder?: string;//提示语
  /**el-date-picker 属性*/
  rangeSeparator?: string | number;
  startPlaceholder?: string | number;
  endPlaceholder?: string | number;
}
