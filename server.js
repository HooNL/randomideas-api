const express = require("express")
const port = 5000

const app = express()
app.use(express.json())

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

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Random Ideas API",
  })
})

app.get("/api/ideas", (req, res) => {
  res.json({ success: true, data: ideas })
})

app.get("/api/ideas/:id", (req, res) => {
  const idea = ideas.find((i) => i.id === parseInt(req.params.id))
  if (!idea) {
    return res
      .status(404)
      .json({ success: false, message: "Idea not found" })
  }
  res.json({ success: true, data: idea })
})

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
)
