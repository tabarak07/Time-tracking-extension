const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hostname: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.-]+$/.test(v); // Basic domain validation
      },
      message: props => `${props.value} is not a valid hostname!`,
    },
  },
  timeSpent: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["productive", "unproductive", "neutral"],
  },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

// Index for optimized queries
logSchema.index({ userId: 1, hostname: 1 });

module.exports = mongoose.model("Log", logSchema);
