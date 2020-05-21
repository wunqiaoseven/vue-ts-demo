<template>
  <div v-if="!item.hidden" class="menu-wrapper">

    <router-link
      v-if="(hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow )|| item.noChild"
      :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)"
                    :class="{'submenu-title-noDropdown':!isNest}">
        <svg-icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon"
                  :icon-class="onlyOneChild.meta.icon"></svg-icon>
        <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name||item.path">
      <template slot="title">
        <svg-icon v-if="item.meta&&item.meta.icon"
                  :icon-class="item.meta.icon"></svg-icon>
        <span v-if="item.meta&&item.meta.title"
              slot="title">{{item.meta.title}}</span>
      </template>

      <div v-for="(child,i) in item.children" :key="i" v-if="!child.hidden">
        <sidebar-item :is-nest="true" class="nest-menu"
                      v-if="!child.hideChildren && child.children&&child.children.length>0"
                      :item="child" :key="child.path"
                      :base-path="resolvePath(child.path)"></sidebar-item>

        <router-link v-else :to="resolvePath(child.path)">
          <el-menu-item :index="resolvePath(child.path)">
            <svg-icon v-if="child.meta&&child.meta.icon"
                      :icon-class="child.meta.icon"></svg-icon>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </div>
    </el-submenu>

  </div>
</template>

<script lang="ts">
  import path from 'path';
  import {Vue, Component, Prop} from 'vue-property-decorator';

  @Component({})
  export default class SidebarItem extends Vue {
    onlyOneChild: any = null;

    @Prop({default: '', type: Object, required: true}) readonly item!: Object;
    @Prop({default: false, type: Boolean, required: true}) readonly isNest!: Boolean;
    @Prop({default: '', type: String, required: true}) readonly basePath!: string;

    created() {
    }

    hasOneShowingChild(children=[]) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    }

    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
    }
  }

</script>

<style>
  .el-tooltip {
    padding: 0 10px !important;
  }
</style>
