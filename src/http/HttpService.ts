/**
 * author :sunqiao@qq.com
 * base : http-api, http-config, config
 *
 * example :
 *  httpServer[http-api](param, query, baseURL)
 *  param : send data
 *  query : url query params
 *  baseURL : config[baseURL]
 *
 * */

import qs from 'qs';
import httpApi from './http-api';
import httpConfig from './http-config';
import config from '../config/index';

const fun: any = {
  _get: Symbol('_get'),
  _post: Symbol('_post'),
  _postJson: Symbol('_postJson'),
  _postMulti: Symbol('_postMulti'),
  _download: Symbol('_download'),
};

class HttpService {
  static instance: HttpService;

  [propName: string]: any;

  static getInstance() {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  protected constructor() {
    Object.keys(httpApi).forEach(m => {
      const _api = httpApi[m], _apiName = Object.keys(_api);
      _apiName.forEach(appName => this.httpFactory(appName, _api[appName], m));
    });
  }

  [fun._get](...params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      httpConfig.get(params[0] + (params[1] ? '?' + qs.stringify(params[1]) : ''))
        .then((response: any) => resolve((response || {}).data))
        .catch(error => reject(error));
    });
  }

  [fun._post](...params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      httpConfig.post(params[0], qs.stringify(params[1]),
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .then((response: any) => resolve((response || {}).data))
        .catch(error => reject(error));
    });
  }

  [fun._postJson](...params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      httpConfig.post(params[0], params[1],
        {headers: {'Content-Type': 'application/json'}})
        .then((response: any) => resolve((response || {}).data))
        .catch(error => reject(error));
    });
  }

  [fun._postMulti](...params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      httpConfig.post(params[0], params[1],
        {headers: {'Content-Type': 'multipart/form-data'}})
        .then((response: any) => resolve((response || {}).data))
        .catch(error => reject(error));
    });
  }

  [fun._download](...params: Array<any>): Promise<any> {
    return new Promise((resolve, reject) => {
      httpConfig.post(params[0], qs.stringify(params[1]), {
        responseType: 'blob',
      }).then(response => {
        if (!response || !response.data) return;
        let _fileName = null;
        try {
          _fileName = response.headers['content-disposition'].split('=')[1];
        } catch (e) {
        }
        const fileName = _fileName || (params[1] || {}).downloadName || 'download-' +
          new Date().getTime();
        let blob = new Blob([response.data]);
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
        resolve(response.data);
      }).catch(error => reject(error));
    });
  }

  private httpFactory(apiName: string, url: string, method: string) {
    this[apiName] = (
      param?: any, query?: any, baseURL?: string) => this[fun[method]](
      this.urlLoad(method, baseURL, query, url), param);
  }

  private urlLoad(m: string, b = 'baseUrl', q: any, u: string) {
    const baseURL = config[b];
    const list = u.split('/')
      .filter(i => i.startsWith('{'))
      .map(i => i.replace(/\{|\}/g, ''));
    let url = u;
    list.forEach(i => {
      url = url.replace('{' + i + '}', q[i]);
      delete q[i];
      JSON.stringify(q) === '{}' && (q = null);
    });
    return baseURL + (m === '_get' ? url : url + (q ? '?' + qs.stringify(q) : ''));
  }

}

export default HttpService.getInstance();
