module.exports = (mongoose) => {
  return new mongoose.Schema({
    completed: String,
    value: String,
    user_id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  })
}
