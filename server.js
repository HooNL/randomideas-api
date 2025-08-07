const express = require("express")
const port = 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Random Ideas API",
  })
})


const ideasRouter = require("./routes/ideas")
app.use("/api/ideas", ideasRouter)


app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
)
