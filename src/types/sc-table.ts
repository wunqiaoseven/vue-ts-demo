import ScForm from './sc-form';

export default interface IfScTable {
  /**table*/
  tableData: Array<any>;//表单数据
  tableQuery: object;//表单的查询条件
  currentRow: object;//正在进行操作的行
  multipleSelection: Array<any>//选中的行
  editRowData: any;//编辑行数据
  tableColumns: Array<any>;//table-column
  options: Array<any>;//操作按钮
  rowId: string;//table行主键字段
  queryFormData: Array<ScForm>;//查询表单配置
  editFormData: Array<ScForm>;//编辑表单配置

  /**pagination*/
  total: number;//表单总条数
  itemPage: number;//表单当前页
  pageSize: number;//单页数据条数
  showPage: Boolean;//显示翻页组件

  /**dialog*/
  showEditDialog: boolean;//编辑弹窗开关

  /**table的基础逻辑方法*/

  getTableList: Function//查询获取table数据

  resetQuery: Function//重置查询表单

  addRow: Function//添加行

  deleteRow: Function//删除行

  batchDelete: Function//批量删除

  editRow: Function//编辑行

  initEditForm: Function//初始化编辑表单

  itemPageChange: Function//翻页

  sizeChange: Function//change单页数量

  /**子类重写通用方法*/

  detailClick: Function//查看详情操作

  xhrAddData: Function//xhr添加数据

  xhrGetData: Function//xhr查询数据

  xhrDeleteData: Function//xhr删除数据
}
