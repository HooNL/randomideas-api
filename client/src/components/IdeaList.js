import IdeasApi from "../services/ideasApi"

class IdeaList {
  constructor() {
    this._ideaListElement = document.querySelector("#idea-list")
    this.getIdeas()
    this._ideas = []
    this._validTags = new Set()
    this._validTags.add("technology")
    this._validTags.add("software")
    this._validTags.add("business")
    this._validTags.add("education")
    this._validTags.add("health")
    this._validTags.add("inventions")
    this._validTags.add("design")
  }

  addEventListeners() {
    // Delete idea event listener
    this._ideaListElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-times")) {
        e.stopImmediatePropagation()
        const ideaId = e.target.parentElement.parentElement.dataset.id
        this.deleteIdea(ideaId)
        console.log(`Idea with ID ${ideaId} deleted`)
      }
    })
    // Fetch idea by ID when card is clicked
    // this._ideaListElement.addEventListener("click", (e) => {
    //   if (e.target.classList.contains("card")) {
    //     const ideaId = e.target.dataset.id
    //     IdeasApi.getIdeaById(ideaId)
    //       .then((res) => {
    //         const idea = res.data.data
    //         console.log(`Idea with ID ${ideaId} fetched`, idea)
    //         // Here you can handle the fetched idea, e.g., display it in a modal
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching idea:", error)
    //       })
    //   }
    // })

    // Update idea event listener
    this._ideaListElement.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-pencil-alt")) {
        e.stopImmediatePropagation()
        const ideaId = e.target.parentElement.parentElement.dataset.id
        const updatedIdea = {
          text: prompt("Enter new idea text:"),
          tag: prompt("Enter new tag:"),
          username: localStorage.getItem("username"),
        }
        this.updateIdea(ideaId, updatedIdea)
        console.log(`Idea with ID ${ideaId} updated`, updatedIdea)
      }
    })
  }

  async getIdeas() {
    try {
      const res = await IdeasApi.getIdeas()
      this._ideas = res.data.data
      this.render()
    } catch (error) {
      console.error("Error fetching ideas:", error)
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea)
    this.render()
  }

  getTagClass(tag) {
    tag = tag.toLowerCase()
    let tagClass = `tag-${tag}`
    if (this._validTags.has(tag)) {
      return tagClass
    } else {
      tagClass = ""
    }
    return tagClass
  }

  async updateIdea(id, updatedIdea) {
    try {
      const res = await IdeasApi.updateIdea(id, updatedIdea)
      const index = this._ideas.findIndex((idea) => idea._id === id)
      if (index !== -1) {
        this._ideas[index] = res.data.data
        this.render()
      }
    } catch (error) {
      console.error("Error updating idea:", error)
    }
  }

  async deleteIdea(id) {
    try {
      const res = await IdeasApi.deleteIdea(id)
      this._ideas = this._ideas.filter((idea) => idea._id !== id)
      this.getIdeas()
      console.log(`Idea with ID ${id} deleted successfully`)
    } catch (error) {
      alert("You can only delete your own ideas.")
      console.error("Error deleting idea:", error)
    }
  }

  render() {
    this._ideaListElement.innerHTML = this._ideas
      .map((idea) => {
        const localDate = new Date(idea.date).toLocaleDateString()
        const deleteBtn =
          localStorage.getItem("username") === idea.username
            ? `<button class="delete" title="Delete Idea">
              <i class="fas fa-times"></i>
            </button>`
            : ""
        const editBtn =
          localStorage.getItem("username") === idea.username
            ? `<button class="edit" title="Edit Idea">
              <i class="fas fa-pencil-alt"></i>
            </button>`
            : ""

        return `    
         <div class="card" data-id="${idea._id}">
       ${deleteBtn}
       ${editBtn}
        <h3> 
            ${idea.text}
        </h3>
        <p class="tag ${this.getTagClass(idea.tag)}">${idea.tag.toUpperCase()}</p>
        <p class='author-date'>
          Posted on <span class="date">${localDate}</span> by
          <span class="author">${idea.username}</span>
        </p>
          </div>
        `
      })
      .join("")

    this.addEventListeners()
  }
}

export default IdeaList
