import { API_URL } from './constants'

export const API = {
  postRequest(url, req, callback, error) {
    req.headers = Object.assign({}, req.headers, {
      'Content-Type': 'application/json'
    })
    req.method = 'POST'
    req.headers = new Headers(req.headers)

    if (!req.body) {
      req.body = {}
    }

    req.body = JSON.stringify(req.body)

    if (callback) {
      return fetch(new Request(API.transformURL(url), req))
      .then(res => res.json())
      .then(callback)
      .catch(error)
    } else {
      return fetch(new Request(API.transformURL(url), req))
    }
  },

  getRequest(url, callback, error) {
    let result = fetch(API.transformURL(url)).then(res => res.json())

    if (callback) {
      result = result.then(callback)
    }

    if (error) {
      result = result.catch(error)
    }

    return result
  },

  joinPath(...paths) {
    return paths.join('/').replace(/\/+/g, '/')
  },

  transformURL(url) {
      return /^https?:\/\//
        ? url
        : API_URL + url
  },
}