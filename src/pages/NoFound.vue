<template>
  <div class="not-found">
    <h1>这个页面走丢了</h1>
    <p>404页面</p>
  </div>
</template>

<script lang="ts">

  import {Vue, Component} from 'vue-property-decorator';

  @Component({
    components: {},
  })
  export default class NoFound extends Vue {

  }
</script>

<style scoped lang="scss">
  .not-found {
    text-align: center;
  }
</style>

