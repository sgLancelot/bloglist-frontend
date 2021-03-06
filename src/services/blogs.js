import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async (updatedObject, id) => {
  const targetUrl = `${baseUrl}/${id}`
  const response = await axios.put(targetUrl, updatedObject)
  return response.data
}

const del = async id => {
  const targetUrl = `${baseUrl}/${id}`
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(targetUrl, config)
  return response.status
}

export default { getAll, create, setToken, addLike, del }