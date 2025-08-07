const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const connectDB = require("./config/db")
const path = require("path")

// Connect to MongoDB
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the React app
// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "public")))
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"))
// })
// }

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
