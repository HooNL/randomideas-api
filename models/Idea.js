const { default: mongoose } = require("mongoose")

const IdeaSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text is required"],
  },
  tag: {
    type: String,
  },
  username: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

const Idea = mongoose.model("Idea", IdeaSchema)
module.exports = Idea
