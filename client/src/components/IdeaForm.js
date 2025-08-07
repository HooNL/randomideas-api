import IdeasApi from "../services/ideasApi"
import IdeaList from "./IdeaList"

class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal")
    this._ideaList = new IdeaList()
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this))
  }

  async handleSubmit(e) {
    e.preventDefault()

    if (
      !this._form.elements.username.value ||
      !this._form.elements.text.value ||
      !this._form.elements.tag.value
    ) {
      alert("Please fill in all fields before submitting your idea.")
    }

    // Save username to localStorage
    localStorage.setItem("username", this._form.elements.username.value)

    const idea = {
      username: this._form.elements.username.value,
      text: this._form.elements.text.value,
      tag: this._form.elements.tag.value,
    }

    // Add Idea to server
    const newIdea = await IdeasApi.createIdea(idea)

    // Add Idea to list
    const ideaList = this._ideaList
    ideaList.addIdeaToList(newIdea.data.data)

    this._form.reset()

    this.render()

    document.dispatchEvent(new Event("closemodal"))
  }

  render() {
    this._formModal.innerHTML = `
    <form id="idea-form">
    <button type="button" id="close-btn" title="Close Modal">
      <i class="fas fa-times"></i>
    </button>
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" title="Enter your username" placeholder="Enter your username" value="${
            localStorage.getItem("username")
              ? localStorage.getItem("username")
              : ""
          }" />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <select name="tag" id="tag">
            <option value="technology">Technology</option>
            <option value="software">Software</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="inventions">Inventions</option>
            <option value="design">Design</option>
          </select>
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>`

    this._form = document.querySelector("#idea-form")
    this.addEventListeners()
  }
}

export default IdeaForm
