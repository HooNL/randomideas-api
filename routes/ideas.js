const express = require("express")
const router = express.Router()
const Idea = require("../models/Idea")

// Get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find()
    res.json({ success: true, data: ideas })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Get a single idea by ID
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    if (!idea) {
      return res.status(404).json({ success: false, message: "Idea not found" })
    }
    res.json({ success: true, data: idea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Get ideas by tag
router.get("/tag/:tag", async (req, res) => {
  try {
    const ideas = await Idea.find({ tag: req.params.tag })
    res.json({ success: true, data: ideas })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Create a new idea
router.post("/", async (req, res) => {
  const { text, tag, username } = req.body
  const newIdea = new Idea({
    text,
    tag,
    username,
  })
  try {
    const savedIdea = await newIdea.save()
    res.status(201).json({ success: true, data: savedIdea })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Update an existing idea
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
    // Check if the idea exists
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          new: true,
        }
      )
      return res.json({ success: true, data: updatedIdea })
    }
    // If usernames do not match, return unauthorized
    res.status(403).json({
      success: false,
      message: "U are not authorized to update this idea",
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

// Delete an idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)

    // Match the usernames
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id)
      return res.json({
        success: true,
        message: "Idea deleted successfully",
        data: {},
      }) 
    }

    // If usernames do not match, return unauthorized
    res
      .status(403)
      .json({
        success: false,
        message: "U are not authorized to delete this idea",
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
})

module.exports = router
