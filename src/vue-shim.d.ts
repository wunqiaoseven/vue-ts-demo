import Vue from 'vue';

declare module '*.vue' {
  export default Vue;
}

// iview 全局方法
declare module 'vue/types/vue' {
  interface Vue {
    $Message: any,
    $Modal: any,
    testMixinArg: string,
    [propName: string]: any;
  }

  // 可以使用 `VueConstructor` 接口
  // 来声明全局 property
  interface VueConstructor {
    $myGlobal: string
  }
}

// ComponentOptions 声明于 types/options.d.ts 之中
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    myOption?: string
  }
}
