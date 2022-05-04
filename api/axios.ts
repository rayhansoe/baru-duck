import axios from 'axios'

// const BASE_URL = 'http://localhost:5000'
const BASE_URL = 'https://ducknotes.herokuapp.com'

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
})
