const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const connectDB = require("./config/db")

// Connect to MongoDB
connectDB()

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
