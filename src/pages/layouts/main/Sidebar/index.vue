<template>
  <div ref="navItem">
    <el-menu
      mode="vertical" :default-active="activePath" :collapse="isCollapse"
      :default-openeds="openeds"
      background-color="#272727" text-color="#bfcbd9" active-text-color="#bfcbd9">
      <sidebar-item v-for="route in permissionRouters" :key="route.name"
                    :item="route" :base-path="route.path">{{route.name}}</sidebar-item>
    </el-menu>
  </div>
</template>
<script lang="ts">
  import SidebarItem from './SidebarItem';

  import {Vue, Component} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';
  import {ScComputed} from '@/decorators';

  @Component({
    components: {
      SidebarItem,
    },
  })
  export default class Layout extends Vue {
    @Getter('app/sidebar') sidebar;
    @Getter('permission/permissionRouters') permissionRouters;

    @ScComputed('isCollapse', function() {return !this.sidebar.opened;})
    @ScComputed('openeds', function() {return this.permissionRouters && this.permissionRouters.map(i => i.name || i.path);})
    @ScComputed('activePath', function() {
      this.$nextTick(() => {
        const a = document.querySelector('a>li.is-active');
        if (this.$route.path.indexOf('/index') > -1) {
          a && (a.className = 'el-menu-item');
        } else {
          a && (a.className = 'el-menu-item is-active');
        }
      });
      return this.$route.path;
    })

    mounted() {
    }

  }

</script>
