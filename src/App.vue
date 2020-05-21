<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({})
  export default class App extends Vue {}
</script>

<style>
  #app {
    font-family: 微软雅黑;
  }

</style>
