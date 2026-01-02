import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'link', 'image', 'file'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  content: mongoose.Schema.Types.Mixed, // Flexible for different types
  imageUrl: String, // For image uploads
  linkUrl: String, // For links
  reviews: [reviewSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Content', contentSchema);
