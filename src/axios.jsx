import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const instance = axios.create({
  baseURL: backendUrl,
  timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
});

export default instance