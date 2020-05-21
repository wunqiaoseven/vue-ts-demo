import moment from 'moment';

export function isObject(obj) {
  return typeof obj === 'object' && !(obj instanceof Array);
}

export function isArray(obj) {
  return obj instanceof Array;
}

export function isDate(date) {
  if (!date) return false;
  return Boolean(Date.parse(date));
}

export function dateFormat(date, rule = 'YYYY-MM-dd hh-mm-ss') {
  if (!isDate(date)) return date;
  return moment.format(rule)
}
