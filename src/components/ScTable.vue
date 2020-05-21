<template>
  <div>
    <form-mixin ref="queryForm" :formData="queryFormData" :formModel.sync="tableQuery"
                submitText="查询" cancelText="取消"
                @on-submit="getTableList" @on-cancel="resetQuery"></form-mixin>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        v-for="column in tableColumns"
        :fixed="column.fixed"
        :prop="column.prop"
        :label="column.label"
        :width="column.width">
      </el-table-column>
      <el-table-column
        v-if="options.length>0"
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button v-for="op in options" @click="op.callback(scope.row)" :type="op.type||'text'" :size="op.type||'small'">{{op.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination layout=" total,prev, pager, next,jumper,sizes"
                   :page-sizes="[10,20,50,100]"
                   :current-page="itemPage"
                   :page-size="pageSize"
                   class="sc-pagination"
                   v-if="showPage"
                   background
                   :total="total"
                   @current-change="itemPageChange"
                   @size-change="sizeChange"
    >
    </el-pagination>

    <el-dialog
      :title="editRowData?'编辑数据弹窗':'新增数据弹窗'"
      :visible.sync="showEditDialog"
      width="30%">
      <form-mixin :formData="editFormData" :formModel.sync="editRowData"
                  @on-submit="getTableList"></form-mixin>

      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="()=>editRowData?editRow():addRow()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script lang="ts">
  /**
   * author: 1058492909@qq.com
   * table-mixins.ts
   * 2020-05-07
   * */
  import {Vue, Component} from 'vue-property-decorator';
  import formMixin from '@/components/ScForm';
  import {ScEnum} from '@/decorators';
  import IfScTable from '@/types/sc-table'

  @Component({
    components: {formMixin},
  })
  export default class ScTable extends Vue implements IfScTable {
    @ScEnum(['EnFormItemType'])
    tableData = [];
    tableQuery = {};
    currentRow = null;
    multipleSelection = [];
    editRowData = null;
    tableColumns = [];
    options = [];
    rowId = null;

    total = null;
    itemPage = null;
    pageSize = 10;

    showPage = true;
    showEditDialog = false;

    queryFormData = [];
    editFormData = [];

    created() {
    }

    async getTableList(data?) {
      const res: any = await this.xhrGetData(data) || [];
      this.tableData = res.data;
      this.total = res.total;
    }

    resetQuery() {
      (this.$refs.queryForm as formMixin).resetForm();// 等同于this.tableQuery={}
    }

    handleSelectionChange(val) {
      this.multipleSelection = val;
    }

    async addRow() {
      if (!this.showEditDialog) {
        this.editRowData = null;
        this.initEditForm();
        return this.showEditDialog = true;
      }
      try {
        await this.xhrAddData(this.editRowData);
        this.showEditDialog = false;

      } catch (e) {
        this.showEditDialog = false;
      }
      await this.getTableList();
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
        });
        await this.xhrDeleteData(row[this.rowId]);
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
        await this.getTableList();
      } catch (e) {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      }

    }

    async editRow(row) {
      if (!this.showEditDialog) {
        this.editRowData = row;
        this.initEditForm();
        return this.showEditDialog = true;
      }
      try {
        await this.xhrAddData();
        this.showEditDialog = false;
      } catch (e) {
        this.showEditDialog = false;
      }
    }

    initEditForm() {

    }

    itemPageChange(val) {
      this.itemPage = val;
      this.getTableList();
    }

    sizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getTableList();
    }

    detailClick(row) {

    }

    async xhrAddData(req?: any): Promise<any> {
      return new Promise(resolve => resolve({}));
    }

    async xhrGetData(req?: any): Promise<any> {
      return new Promise(resolve => resolve({}));
    }

    async xhrDeleteData(rowId: string | number): Promise<any> {
      return new Promise(resolve => resolve({}));
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

