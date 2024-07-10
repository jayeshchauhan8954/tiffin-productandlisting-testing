import { showMessage } from '../helpers/toastHelpers';
import { _toastVariants } from '../constants/constants';
import { getAuthCookie } from '../helpers/authHelpers';

function getRequestHeaders(type) {
  let headers = {}
  switch (type) {
    case 'json':
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-control-allow-origin': '*',
      }
      break
    case 'form':
      headers = {}
      break
    default:
      headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      }
      break
  }
  return headers
}

function createQueryOrParams(object, type = 'query') {
  let string = ''
  let length = Object.entries(object).length || 0
  if (type === 'query') {
    string = '?'
    Object.entries(object).forEach((item, index) => {
      string = string + item[0] + '=' + item[1]
      if (length !== index + 1) {
        string = string + '&'
      }
    })
  } else if (type === 'params') {
    string = '/'
    Object.entries(object).forEach((item, index) => {
      string = string + item[1]
      if (length !== index + 1) {
        string = string + '/'
      }
    })
  }
  return string
}

const apiRequest = async ({
  endUrl,
  method = "GET",
  headerType = 'json',

  // Payload
  body = null,
  query = null,
  params = null,

  auth = true,
  token = null,
  isGoogleApi = false,
  showMsg = false,
}) => {
  let requestHeaders = getRequestHeaders(headerType)

  if (token) {
    requestHeaders.Authorization = 'Bearer ' + token
  } else if (auth && getAuthCookie()) { /* Add token */
    requestHeaders.Authorization = 'Bearer ' + getAuthCookie()
  }

  if (params) { /* Add params */
    endUrl = endUrl + createQueryOrParams(params, 'params')
  }
  if (query) { /* Add query */
    endUrl = endUrl + createQueryOrParams(query, 'query')
  }

  const options = {
    method: method,
    headers: requestHeaders,
    timeoutInterval: 10000,
  }

  if (body) {
    options.body = headerType === 'json' ? JSON.stringify(body) : body
  }

  try {

    let fetched = await fetch(endUrl, options)

    let contentType = fetched.headers.get('Content-Type');

    let response = {}

    if (contentType && contentType.includes('application/json')) {
      response = await fetched.json();
    } else {
      response = await fetched.text()
      return {
        status: true,
        data: response,
        isJson: false
      }
    }

    if (isGoogleApi) {
      return response
    }

    let errMsg = '', status = Boolean(response.status >= 200 && response.status <= 201)

    if (status) {
      /* Will modify according to api's response */
      response = {
        status,
        data: response.data,
        message: response.message,
        isJson: true
      }
    } else {
      errMsg = response?.errors?.[0]?.message
      response = { status, data: {}, message: errMsg || response.message, isJson: true }
    }

    if (showMsg) {
      showMessage({
        variant: status ? _toastVariants.Success : _toastVariants.Error,
        message: errMsg || response?.message,
      })
    }
    return response
  } catch (e) {
    if (showMsg) {
      showMessage({ variant: _toastVariants.Error, message: e.toString() })
    }
    return { status: false, data: {}, message: e.toString(), isJson: true }
  }
}

export {
  apiRequest
}
