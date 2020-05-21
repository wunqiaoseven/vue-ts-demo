const getApi: object = {
  getCaptchaApi:'/dus',
};

const postJson: object = {
  postJson: '/post/json',
};
const postApi: object = {
  postUrlEncode: '/post/url/encode',
};
const postMultiApi: object = {
  postMultiTest: '/post/multi/test',
};
const downloadApi: object = {
  downloadDemo: '/down',
};

const httpApi: any = {
  _get: getApi,
  _post: postApi,
  _postMulti: postMultiApi,
  _download: downloadApi,
  _postJson: postJson,
};
export default httpApi;
