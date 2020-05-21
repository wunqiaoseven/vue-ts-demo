/**
 * author: 1058492909@qq.com
 * http-decorator.ts
 * 2020-05-12
 * */
import http from '@/http/HttpService';
import {createDecorator} from 'vue-class-component';

import * as ScEnums from '@/types/enum';

//注解重写类
export function ScHttp(events: Array<string> = []) {
  return function(target, key) {
    createDecorator(function(componentOptions, k) {
      const mixin = {methods: {}};
      events.forEach(_ev => http[_ev] && (mixin.methods[_ev] = http[_ev]));
      componentOptions.mixins.push(mixin);
    })(target, key);
  };
}

export function ScEnum(events = []) {
  return function(target, key) {
    createDecorator(function(componentOptions, k) {
      const _dt = {};
      const mixin = {data: () => _dt};
      events.forEach(_ev => _dt[_ev] = ScEnums[_ev]);
      componentOptions.mixins.push(mixin);
    })(target, key);
  };
}

//计算属性
export function ScComputed(computedName: string, fun: any) {
  return function(target, key, descriptor) {
    createDecorator(function(componentOptions, k) {
      (componentOptions.computed || (componentOptions.computed = {}))[computedName] = fun;
    })(target, key);
  };
}

