/**
 * author: 1058492909@qq.com
 * decorators-test.ts
 * 2020-05-14
 * */

import {Vue} from 'vue-property-decorator';


//example 注解重写方法
export function overwrite(event?: string) {
  return (target: Vue, key: string, descriptor: any) => {
    descriptor.value = function httpRequest() {
      const args = [];
      for (let _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return new Promise(resolve => resolve);
    };
  };
}
