const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  downloadLink: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Music = mongoose.model('Music', musicSchema);

module.exports = { Music };
