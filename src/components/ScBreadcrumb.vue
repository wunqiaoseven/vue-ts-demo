<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in pathLists" :key="item.path"
                          v-if="item.meta.title">
        <span v-if="item.redirect||index==pathLists.length-1"
              :class="index==pathLists.length-1?'no-redirect':''">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">
          <span class="to-redirect">{{item.meta.title}}</span>
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
  import {Vue, Component, Watch} from 'vue-property-decorator';

  @Component({})
  export default class ScBreadcrumb extends Vue {
    pathLists: Array<any> = [];//面包屑数组

    created() {
      this.getBreadcrumb();
    }

    /**init*/
    @Watch('$route')
    getBreadcrumb() {
      let matched: Array<any> = this.$route.matched.filter((item: any) => item.name);
      const first = matched[0];
      if (first && first.name !== 'index') {
        matched = [
          {
            path: '/index',
            meta: {title: '首页'},
          },
        ].concat(matched);
      }
      this.pathLists = matched;
    }

  }
</script>

<style lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    border-radius: 4px;
    height: 55px;
    width: calc(100% - 40px);
    background-color: #fff;
    display: inline-block;
    font-size: 12px;
    line-height: 55px;
    margin-left: 20px;
    padding-left: 20px;

    .no-redirect {
      color: #000 !important;
      font-weight: 400;
      cursor: text;
    }

    .to-redirect {
      font-size: 12px;
      font-family: SourceHanSansCN-Regular;
      font-weight: 400;
      color: #676767 !important;
    }
  }
</style>
