class IdeaForm {
  constructor() {
    this._formModal = document.querySelector("#form-modal")
  }

  addEventListeners() {
    this._form.addEventListener("submit", this.handleSubmit.bind(this))
  }

  handleSubmit(e) {
    e.preventDefault()
    const text = this._form.elements.text.value.trim()
    const tag = this._form.elements.tag.value.trim()
    const username = this._form.elements.username.value.trim()

    if (username && text && tag) {
    //   console.log("Idea submitted:", { username, text, tag })
      // Here you would typically send the data to a server
      this._form.reset()
      document.dispatchEvent(new Event("closemodal"))
    } else {
      console.error("Please fill in ALL fields.")
    }
  }

  render() {
    this._formModal.innerHTML = `
      <button id="close-btn" title="Close Modal">
        <i class="fas fa-times"></i>
      </button>
      <form id="idea-form">
        <div class="form-control">
          <label for="idea-text">Enter a Username</label>
          <input type="text" name="username" id="username" title="Enter your username" placeholder="Enter your username"
            required />
        </div>
        <div class="form-control">
          <label for="idea-text">What's Your Idea?</label>
          <textarea name="text" id="idea-text"></textarea>
        </div>
        <div class="form-control">
          <label for="tag">Tag</label>
          <input type="text" name="tag" id="tag" />
        </div>
        <button class="btn" type="submit" id="submit">Submit</button>
      </form>`

    this._form = document.querySelector("#idea-form")
    this.addEventListeners()
  }
}

export default IdeaForm
