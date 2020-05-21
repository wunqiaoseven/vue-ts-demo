<template>
  <div>
    <h2>这是一个基于ts语言的vue对象组件</h2>
    <h5>嵌入一个ts 类组件</h5>
    <child-class-component></child-class-component>
  </div>
</template>

<script lang="ts">
  import {mapActions} from 'vuex';
  import childClassComponent from './ChildClassComponent';
  import {EnTest} from '@/types/enum';

  export default {
    name: 'CompanySelect',
    components: {
      childClassComponent,
    },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      data: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        defaultValue: '',
        visible: false,
        active: 'origin',
        name: '',
        Test: EnTest,
        code: '',
        tableData: [],
        headerRow: [
          {
            prop: 'parentId',
            label: '部门ID',
          },
          {
            prop: 'parentName',
            label: '部门名称',
          },
          {
            prop: 'code',
            label: '岗位编号',
          },
          {
            prop: 'name',
            label: '岗位名称',
          },
        ],
        treeData: [],
        treeList: [],
        pages: {
          currentPage: 0,
          total: 0,
          pageSize: 10,
        },
        selection: [],
        confirmList: [],
      };
    },
    watch: {
      'data': {
        handler(value) {
          this.defaultValue = value.map(item => item.name).join(';');
          this.confirmList = value;
        },
        deep: true,
        immediate: true,
      },
      'active': function(value) {
        value === 'job' && this.fetchTableData();
      },
    },
    mounted() {
      //使用枚举
      console.log(this.EnTest);
    },
    updated() {
      this.tableData.forEach(row => {
        this.selection.forEach(item => {
          if (item.id === row.id) {
            this.$refs.multipleTable && this.$refs.multipleTable.toggleRowSelection(row, true);
          }
        });
      });
    },
    methods: {
      ...mapActions(
        'infoReview',
        ['fetchJobTreeData'],
      ),
      jobClick() {
        if (this.disabled) {
          return;
        }
        this.selection = JSON.parse(JSON.stringify(this.confirmList));
        this.active === 'origin' && this.$refs.jobTree && this.$refs.jobTree.setCheckedKeys(this.selection.map(item => item.id));
        this.visible = true;
      },
      renderContent(h, {node, data, store}) {
        return h(arguments[0], {
          props: {
            data,
            node,
            store,
          },
          on: {},
        });
      },
      tabClick(type) {
        if (this.active === type) return;
        this.active = type;
      },
      cansel() {
        this.code = '';
        this.name = '';
      },
      submit() {
        this.confirmList = JSON.parse(JSON.stringify(this.selection));
        this.defaultValue = this.confirmList.map(item => item.name).join(';');
        this.$emit('handleChange', {value: JSON.parse(JSON.stringify(this.selection))});
      },
      // 岗位搜索列表
      reduce(arr, key) {
        let obj = {};
        let newArr = arr.reduce(function(item, next) {
          // eslint-disable-next-line no-unused-expressions
          obj[next[key]] ? '' : obj[next[key]] = true && item.push(next);
          return item;
        }, []);
        return newArr;
      },
      selectAll(arr) {
        if (arr.length) {
          this.selection = this.reduce([...this.selection, ...arr], 'id');
        } else {
          this.operateInverse();
        }
      },
      select(list, row) {
        let selection = JSON.parse(JSON.stringify(this.selection));
        if (selection.filter(item => item.id === row.id).length > 0) {
          selection.forEach((select, index) => {
            if (row.id === select.id) {
              selection.splice(index, 1);
            }
          });
          this.selection = selection;
        } else {
          this.selection = this.reduce([...selection, row], 'id');
        }
      },
      operateInverse() {
        let selection = JSON.parse(JSON.stringify(this.selection));
        let list = [];
        this.tableData.forEach(item => {
          let flag = true;
          selection.forEach((select, index) => {
            if (item.id === select.id) {
              selection.splice(index, 1);
              flag = false;
            }
          });
          flag && list.push(item);
        });
        this.selection = [...selection, ...list];
      },
      sizeChange(pageSize) {
        this.pages.pageSize = pageSize;
        this.fetchTableData();
      },
      currentChange(currentChange) {
        this.pages.currentPage = currentChange;
        this.fetchTableData();
      },
      fetchTableData() {
        this.$axios({
          method: 'post',
          url: '/api/v1/hr/organizations/unit/page',
          data: {
            data: {
              code: this.code,
              name: this.name,
            },
            page: this.pages.currentPage,
            size: this.pages.pageSize,
          },
        }).then(res => {
          if (res.data.code === 'OK') {
            this.tableData = res.data.data;
            this.pages.total = parseInt(res.data.total);
          }
        });
      },
      // 岗位搜索树状图
      loadNode(node, resolve) {
        let parentCode = node ? node.data.code : '';
        let type = node ? node.data.type : '';
        if (type === 'S') {
          resolve([]);
          return;
        }
        if (node.level === 0) {
          type = '';
        } else {
          type = 'C';
        }
        this.fetchJobTreeData({parentCode, type}).then(res => {
          if (res) {
            if (node.level === 0) {
              resolve(res);
              this.treeData = res;
              this.treeList = [...res];
            } else {
              node.data.childList = res;
              this.treeList.push(...res);
              resolve(res);
            }
            let selection = this.$refs.jobTree.getCheckedNodes();
            this.selection = this.reduce([...this.selection, ...selection], 'id');
            this.$refs.jobTree.setCheckedKeys(this.selection.map(item => item.id));
          } else {
            resolve([]);
          }
        });
      },
      treeNodeClick(nodeData) {
      },
      nodeCheck(data, {checkedNodes}) {
        let notCheckList = this.treeList.filter(item => {
          return checkedNodes.filter(check => check.id === item.id).length === 0;
        });
        this.selection = this.reduce([...this.selection, ...checkedNodes], 'id').filter(item => {
          return notCheckList.filter(check => check.id === item.id).length === 0;
        });
      },
    },
  };
</script>
