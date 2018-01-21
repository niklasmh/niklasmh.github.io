import { API_URL } from './constants'

export const api = {
  postRequest(url, req, callback, error) {
    req.headers = Object.assign({}, req.headers, {
      'Content-Type': 'application/json'
    })
    req.method = 'POST'
    req.headers = new Headers(req.headers)

    if (req.body) {
      Object.assign(req.body, {
        secret: SECRET
      })
    } else {
      req.body = { secret: SECRET }
    }

    req.body = JSON.stringify(req.body)

    if (callback) {
      return fetch(new Request(api.transformURL(url), req))
      .then(res => res.json())
      .then(callback)
      .catch(error)
    } else {
      return fetch(new Request(api.transformURL(url), req))
    }
  },

  getRequest(url, callback, error) {
    return fetch(api.transformURL(url))
    .then(res => res.json())
    .then(callback)
    .catch(error)
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
