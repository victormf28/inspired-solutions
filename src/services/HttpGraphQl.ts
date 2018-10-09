import axios from 'axios'

export class HttpGraphQl {
  axios: any
  url: string

  constructor() {
    this.axios = axios
    this.url = `https://eu1.prisma.sh/sergio-melendez-f22980/database/dev`
  }

  query(params?: object): Promise<any> {
    return params ? axios.post(this.url, params).then(({ data }) => data) : axios.post(this.url).then(({ data }) => data)
  }

  post(data: any): Promise<any> {
    return axios.post(this.url, data)
  }
}
