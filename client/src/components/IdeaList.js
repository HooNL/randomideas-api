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

  render() {
    this._ideaListElement.innerHTML = this._ideas
      .map((idea) => {
        const localDate = new Date(idea.date).toLocaleDateString()
        return `    
         <div class="card">
        <button class="delete" title="Delete Idea"><i class="fas fa-times"></i></button>
        <h3>
            ${idea.text}
        </h3>
        <p class="tag ${this.getTagClass(
          idea.tag
        )}">${idea.tag.toUpperCase()}</p>
        <p class='author-date'>
          Posted on <span class="date">${localDate}</span> by
          <span class="author">${idea.username}</span>
        </p>
          </div>
        `
      })
      .join("")
  }
}

export default IdeaList
