# vue-ts-base

> 为了规范前端代码，增强项目后期维护性与扩展性，本项目扩展了ts与jsx。
写法上支持基本的vue、js对象组件，升级版的vue、ts对象组件，高级版的vue、ts、class组件。


## 此repo是基于[Vue + TypeScript 新项目起手式](https://juejin.im/post/59f29d28518825549f7260b6)逐步实现的

如果你按照文章没有配出来的话，可以参考这个项目的代码，进行比较，更多问题可以询问1058492909@qq.com

## 特性
- webpack4
- vue
- vue-router
- vuex
- typescript
- jsx
- tslint
- 单vue文件开发
- vue-cli
- ~~eslint~~

## 开始

``` bash

# Install project dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```

## 注意

> 为了减少安装依赖时间，项目测试框架的依赖包全部整理到testPackage.json文件，
如需构建自动化测试，可以将测试依赖复制到package.json中并安装

## vue-js组件

```$xslt
<template></template>

<script>
  export default {
     name: 'Test',
     componentName: 'Test',
     props: [],
     created() {
     },
  };
</script>
```

## vue-ts组件

```$xslt
<template></template>

<script lang="ts">
 export default {
     name: 'Test',
     componentName: 'Test',
     props: [],
     created() {
     },
  };
</script>
```
## vue-ts-class组件（template||render）

```$xslt
<template></template>

<script lang="tsx">
  import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
  import http from '@/http/HttpService';
  import ScHttp from '@/decorators/http-decorator';

  @Component({})
  export default class FilterItem extends Vue {
    dddp: string = 'Welcome to Your Vue-Typescript App';
    @Prop({default: 'default value'}) readonly ccss!: string;
    @ScHttp(['getDemo', 'convertDetail'])
    @Emit()
    processChange(data?) {
    }
    async created() {
     
    }
    render(h, context) {
      return (
        <div>jsx</div>
      );
    }
  }
</script>

```
