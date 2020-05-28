<script lang="tsx">
  /**
   * author: 1058492909@qq.com
   * table-mixins.ts
   * 2020-05-07
   * */
  import {Vue, Component} from 'vue-property-decorator'
  import formMixin from '@/components/ScForm'
  import {ScEnum} from '@/decorators'
  import IfScTable from '@/types/sc-table'

  @Component({
    components: {formMixin},
  })
  export default class JsxTable extends Vue implements IfScTable {
    @ScEnum(['EnFormItemType'])
    tableData = []
    tableQuery = {}
    currentRow = null
    multipleSelection = []
    editRowData = null
    tableColumns = []
    options = []
    rowId = null

    total = null
    itemPage = null
    pageSize = 10

    showPage = true
    showEditDialog = false

    queryFormData = []
    editFormData = []

    created() {
    }

    async getTableList(data?) {
      const res: any = await this.xhrGetData(data) || []
      this.tableData = res.data
      this.total = res.total
    }

    resetQuery() {
      (this.$refs.queryForm as formMixin).resetForm()// 等同于this.tableQuery={}
    }

    handleSelectionChange(val) {
      this.multipleSelection = val
    }

    async addRow() {
      if (!this.showEditDialog) {
        this.editRowData = null
        this.initEditForm()
        return this.showEditDialog = true
      }
      try {
        await this.xhrAddData(this.editRowData)
        this.showEditDialog = false

      } catch (e) {
        this.showEditDialog = false
      }
      await this.getTableList()
    }

    async batchDelete() {
      //todo
    }

    async deleteRow(row) {
      try {
        await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        await this.xhrDeleteData(row[this.rowId])
        this.$message({
          type: 'success',
          message: '删除成功!',
        })
        await this.getTableList()
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      }

    }

    async editRow(row?) {
      if (!this.showEditDialog) {
        this.editRowData = row
        this.initEditForm()
        return this.showEditDialog = true
      }
      try {
        await this.xhrAddData()
        this.showEditDialog = false
      } catch (e) {
        this.showEditDialog = false
      }
    }

    initEditForm() {

    }

    itemPageChange(val) {
      this.itemPage = val
      this.getTableList()
    }

    sizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTableList()
    }

    detailClick(row) {

    }

    async xhrAddData(req?: any): Promise<any> {
      return new Promise(resolve => resolve({}))
    }

    async xhrGetData(req?: any): Promise<any> {
      return new Promise(resolve => resolve({}))
    }

    async xhrDeleteData(rowId: string | number): Promise<any> {
      return new Promise(resolve => resolve({}))
    }

    searchFormRender(h) {
      return <form-mixin ref="queryForm" formData={this.queryFormData} formModel={this.tableQuery}
                         submitText="查询" cancelText="取消"
                         onSubmit={this.getTableList.bind(this)}
                         onCancel={this.resetQuery.bind(this)}
                         {...{on: {'update:formModel': val => this.tableQuery = val}}}
      ></form-mixin>
    }

    tableOptionRender(h) {
      return <el-table-column
        fixed="right"
        label="操作">
        {
          scope => (
            <el-button onClick={() => this.editRow(scope.row)}
            >编辑</el-button>
          )
        }
      </el-table-column>
    }

    tableSelectionRender(h) {
      return <el-table-column
        type="selection"
        width="55">
      </el-table-column>
    }

    columnRender(h, column) {
      return <el-table-column
        fixed={column.fixed}
        prop={column.prop}
        label={column.label}
        width={column.width}>
      </el-table-column>
    }

    pageRender(h) {
      return <el-pagination layout=" total,prev, pager, next,jumper,sizes"
                            page-sizes={[10, 20, 50, 100]}
                            current-page={this.itemPage}
                            page-size={this.pageSize}
                            className="sc-pagination"
                            background
                            total={this.total}
                            on-current-change={this.itemPageChange.bind(this)}
                            on-size-change={this.sizeChange.bind(this)}
      ></el-pagination>
    }

    editDialogRender(h) {
      return <el-dialog
        title={this.editRowData ? '编辑数据弹窗' : '新增数据弹窗'}
        visible={this.showEditDialog}
        {...{on: {'update:visible': val => this.showEditDialog = val}}}
        width="30%">
        {this.editFormRender(h)}
        <span slot="footer" class="dialog-footer">
        <el-button onClick={() => this.showEditDialog = false}>取 消</el-button>
      <el-button type="primary" onClick={() => this.editRowData ? this.editRow() : this.addRow()}>确 定</el-button>
    </span>
      </el-dialog>
    }

    editFormRender(h) {
      return <form-mixin formData={this.editFormData} formModel={this.editRowData}
                         {...{on: {'update:formModel': val => this.editRowData = val}}}
                         onSubmit={this.getTableList.bind(this)}></form-mixin>
    }

    render(h, context) {
      return (
        <div>
          {this.searchFormRender(h)}
          <el-table
            data={this.tableData}
            selection-change={this.handleSelectionChange.bind(this)}
            border
            style="width: 100%">
            {this.tableSelectionRender(h)}

            {this.tableColumns.map(column => this.columnRender(h, column))}

            {this.tableOptionRender(h)}
          </el-table>
          {this.pageRender(h)}
          {this.editDialogRender(h)}
        </div>
      )
    }

  }

</script>


<style scoped>
  .sc-pagination {
    background-color: red;
  }

  .title-bar {
    background-color: red;
  }
</style>

