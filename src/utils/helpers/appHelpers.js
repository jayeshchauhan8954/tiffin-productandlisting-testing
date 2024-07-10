import moment from 'moment';
import { S3Configs } from '../config/config';

const transformObjectToDotNotation = (obj, prefix = "", result = []) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (!value) return;

    const nextKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object") {
      transformObjectToDotNotation(value, nextKey, result);
    } else {
      result.push(nextKey);
    }
  })
  return result
};

const removeNullKeys = (req = {}) => {
  let res = {}
  Object.entries(req)?.some((keyValue) => {
    let key = keyValue[0],
      value = keyValue[1]
    if (value) {
      res[key] = value
    }
  })
  return res
}

const getNumbersOnly = ({ e, min, max, precision }) => {
  const regex = /^[0-9]+([.][0-9])?$/;
  let value = e.target.value;
  const previousValues = value.substring(0, value.length - 1);

  if (value.includes(".")) {
    if (precision == 0) return e.target.value = previousValues;
    const splitNum = value.split(".");/* means values has multiple dots */
    if (splitNum.length > 2) return e.target.value = previousValues;
    if (!regex.test(splitNum[0]) || (splitNum[1] && !regex.test(splitNum[1]))) return e.target.value = previousValues;
    if (splitNum[1].length > precision) return e.target.value = previousValues;
  }
  else if (!regex.test(value)) return e.target.value = previousValues;

  value = parseFloat(value);
  if (min && value < min) return e.target.value = previousValues;
  if (max && value > max) return e.target.value = previousValues;
  if (value == 0 && value.length > 2) return e.target.value = 0;
}

const getCharsOnly = (params) => {
  const { e, min, max } = params;
  const regex = /^([a-zA-Z]+\s?)*$/;
  const value = e.target.value;
  if (!value) return;

  const previousValues = value.substring(0, value.length - 1);

  if (!regex.test(value)) {
    e.target.value = previousValues;
    return getCharsOnly(params);
  };
  if (min && value?.length < min) return e.target.value = previousValues;
  if (max && value?.length > max) return e.target.value = previousValues;
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const getS3Url = (path) => S3Configs.base_url + path;

const getReedeemPointPrice = (points, unitPoints, unitPrice) => {
  return parseFloat(parseFloat((points / unitPoints) * unitPrice).toFixed(1))
}



export {
  transformObjectToDotNotation,
  getNumbersOnly,
  getCharsOnly,
  validateEmail,
  getS3Url,
  getReedeemPointPrice,
  removeNullKeys
}
