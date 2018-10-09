import auth from './../oauth/oauth.guard'
import axios from 'axios'
import * as qs from 'qs'

export class Http {
  axios: any

  constructor() {
    this.axios = axios
  }
  setAuthorization() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('token')
  }

  get(url: string, params?: object): Promise<any> {
    this.setAuthorization()
    return params ? axios.get(url, { params }) : axios.get(url)
  }

  getFake(url: string, params?: object): Promise<any> {
    delete axios.defaults.headers.common.Authorization
    return params ? axios.get(url, { params }) : axios.get(url)
  }
  postFake(url: string, params?: object): Promise<any> {
    delete axios.defaults.headers.common.Authorization
    return params ? axios.post(url, qs['stringify'] (params)) : axios.post(url)
  }

  getAll(arrUrls): Promise<any> {
    this.setAuthorization()
    return new Promise((resolve, reject) => {
      axios.all(arrUrls.map((url) => {
        return axios.get(url)
      })).then(axios.spread((...args) => {
        resolve(args)
      }))
    })
  }

  delete(url: string): Promise<any> {
    this.setAuthorization()
    return axios.delete(url)
  }

  post(url: string, data: any): Promise<any> {
    this.setAuthorization()
    return axios.post(url, data)
  }

  put(url: string, data: any): Promise<any> {
    this.setAuthorization()
    return axios.put(url, data)
  }

  putAll(arrUrls): Promise<any> {
    this.setAuthorization()
    return new Promise((resolve, reject) => {
      axios.all(arrUrls.map(({ url, params }) => {
        return params ? axios.put(url, params) : axios.put(url)
      })).then(axios.spread((...args) => {
        resolve(args)
      }))
    })
  }
}
