export default interface IfScForm {
  formData?: Array<any>//表单渲染数据
  formModel?: object;//表单数据模型
  submitText?: string//提交按钮文案
  cancelText?: string//取消返回按钮文案

  onSubmit: Function//提交
  onCancel: Function//取消||返回
}
