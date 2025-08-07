import axios from "axios"
class IdeasApi {
  constructor() {
    this._baseUrl = "http://localhost:5000/api/ideas"
  }

  getIdeas() {
    return axios.get(this._baseUrl)
  }

  createIdea(idea) {
    return axios.post(this._baseUrl, idea)
  }
  updateIdea(id, idea) {
    return axios.put(`${this._baseUrl}/${id}`, idea)
  }
  getIdeaById(id) {
    return axios.get(`${this._baseUrl}/${id}`)
  }

  deleteIdea(id) {
    const username = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : ""
    return axios.delete(`${this._baseUrl}/${id}`, {
      data: { username },
    })
  }
}

export default new IdeasApi()
