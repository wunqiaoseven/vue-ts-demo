<script lang="ts">
  import {Component} from 'vue-property-decorator';
  import JsxTable from '@/components/JsxTable';
  import {EnFormItemType} from '@/types/enum';
  import {ScHttp} from '@/decorators';

  @Component({})
  export default class ChildTable extends JsxTable {
    @ScHttp(['getCaptchaApi'])

    tableColumns = [
      {
        prop: 'date',
        fixed: '',
        label: '日期',
        width: '',
      }, {
        prop: 'name',
        fixed: '',
        label: '姓名',
        width: '',
      }, {
        prop: 'address',
        fixed: '',
        label: '地址',
        width: '',
      }];
    queryFormData = [
      {
        label: 'INPUT',
        model: 'INPUT',
        EnFormItemType: EnFormItemType.INPUT,
      }, {
        label: 'SELECT',
        model: 'SELECT',
        EnFormItemType: EnFormItemType.SELECT,
        options: [
          {
            label: 'label0',
            value: 0,
          }, {
            label: 'label1',
            value: 1,
          }],
      }, {
        label: 'SWITCH',
        model: 'SWITCH',
        EnFormItemType: EnFormItemType.SWITCH,
      }];

    async created() {
      this.getTableList();
      try {
        const ccss = await this.getCaptchaApi();
      } catch (e) {
        console.log(e);
      }
    }

    mounted() {
    }

    initEditForm() {
      this.editFormData = [
        {
          label: 'INPUT',
          model: 'name',
          EnFormItemType: EnFormItemType.INPUT,
        }, {
          label: 'SELECT',
          model: 'province',
          EnFormItemType: EnFormItemType.SELECT,
          options: [
            {
              label: '上海',
              value: 0,
            }, {
              label: '北京',
              value: 1,
            }],
        }, {
          label: 'SWITCH',
          model: 'address',
          EnFormItemType: EnFormItemType.SWITCH,
        }];
    }

    async xhrGetData(req?) {
      return new Promise((resolve, reject) => {
        resolve({
          data: [
            {
              date: '2016-05-02',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1518 弄',
              zip: 200333,
            }, {
              date: '2016-05-04',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1517 弄',
              zip: 200333,
            }, {
              date: '2016-05-01',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1519 弄',
              zip: 200333,
            }, {
              date: '2016-05-03',
              name: '王小虎',
              province: '上海',
              city: '普陀区',
              address: '上海市普陀区金沙江路 1516 弄',
              zip: 200333,
            }],
          total: 100,
        });
      });
    }
  }
</script>

<style scoped>
  .sc-pagination {
    /*background-color: blue;*/
  }
</style>
