import axios from 'axios'

const URL_UDENAR = process.env.URL_UDENAR

const api = axios.create({
  baseURL: URL_UDENAR,
  timeout: 5000
})

export default api
