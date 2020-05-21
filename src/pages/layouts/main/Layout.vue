<template>
  <div>
    <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}" v-if="!$store.getters.hideLayOut">
      <navbar></navbar>
      <div class="main-bottom">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
          <section class="app-main">
            <breadcrumb></breadcrumb>
            <router-view></router-view>
          </section>
        </div>
      </div>
    </div>
    <div v-if="$store.getters.hideLayOut">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
  import Sidebar from './Sidebar';
  import Navbar from './Navbar';
  import Breadcrumb from '@/components/ScBreadcrumb';

  import {Vue, Component} from 'vue-property-decorator';
  import {Getter} from 'vuex-class';

  @Component({
    components: {
      Navbar,
      Sidebar,
      Breadcrumb
    },
  })
  export default class Layout extends Vue {
    @Getter('app/sidebar') sidebar;

  }
</script>

<style scoped lang="scss">
  .app-main {
    position: relative;
    overflow: hidden;
  }
  .main-bottom{

  }
</style>
