export const getPropByPath = (obj, path, strict) => {
  let tempObj = obj;
  let p = path.replace(/\[(\w+)\]/g, '.$1');
  p = p.replace(/^\./, '');

  const keyArr = p.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1;) {
    if (!tempObj && !strict) break;
    const key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
    i += 1;
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null,
  };
};

export const getValueByPath = (object, prop) => {
  const p = prop || '';
  const paths = p.split('.');
  let current = object;
  let result = null;
  for (let i = 0, j = paths.length; i < j; i += 1) {
    const path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

export const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export const noop = () => {};

export const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length;) {
    if (a[i] !== b[i]) return false;
    i += 1;
  }
  return true;
};

export default {
  getPropByPath,
  getValueByPath,
  hasOwn,
  noop,
  valueEquals,
};
