const express = require("express")
const router = express.Router()

const ideas = [
  {
    id: 1,
    text: "Learn a new programming language",
    tag: "Education",
    username: "Akitaki",
    date: "2023-10-01",
  },
  {
    id: 2,
    text: "Start a blog about tech",
    tag: "Writing",
    username: "Techie",
    date: "2023-10-02",
  },
  {
    id: 3,
    text: "Build a personal portfolio website",
    tag: "Web Development",
    username: "WebWizard",
    date: "2023-10-03",
  },
  //   {
  //     id: 4,
  //     text: "Create a RESTful API",
  //     tag: "Backend",
  //     username: "API_Guru",
  //     date: "2023-10-04",
  //   },
  //   {
  //     id: 5,
  //     text: "Implement user authentication",
  //     tag: "Security",
  //     username: "AuthMaster",
  //     date: "2023-10-05",
  //   },
  //   {
  //     id: 6,
  //     text: "Explore machine learning concepts",
  //     tag: "Education",
  //     username: "ML_Explorer",
  //     date: "2023-10-06",
  //   },
]

// Get all ideas
router.get("/", (req, res) => {
  res.json({ success: true, data: ideas })
})

// Get a single idea by ID
router.get("/:id", (req, res) => {
  const idea = ideas.find((i) => i.id === +req.params.id)
  if (!idea) {
    return res.status(404).json({ success: false, message: "Idea not found" })
  }
  res.json({ success: true, data: idea })
})

// Create a new idea
router.post("/", (req, res) => {
  const { text, tag, username } = req.body
  const newIdea = {
    id: ideas.length + 1,
    text,
    tag,
    username,
    date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format,
  }
  if (!text || !tag || !username) {
    return res.status(400).json({ success: false, message: "All fields are required" })
  }
  ideas.push(newIdea)
  res.status(201).json({ success: true, data: newIdea })
})

// Update an existing idea
router.put("/:id", (req, res) => {
  const { text, tag, username } = req.body
  const idea = ideas.find((i) => i.id === +req.params.id)
  if (!idea) {
    return res.status(404).json({ success: false, message: "Idea not found" })
  }
  idea.text = text || idea.text
  idea.tag = tag || idea.tag
  idea.username = username || idea.username
  res.json({ success: true, data: idea }) 
})

// Delete an idea
router.delete("/:id", (req, res) => {
  const ideaIndex = ideas.findIndex((i) => i.id === +req.params.id)
  if (ideaIndex === -1) {
    return res.status(404).json({ success: false, message: "Idea not found" })
  }
  ideas.splice(ideaIndex, 1)
  res.json({ success: true, message: "Idea deleted successfully" })
}) 

module.exports = router
