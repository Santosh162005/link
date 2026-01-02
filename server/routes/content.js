import express from 'express';
import Content from '../models/Content.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// GET all content
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find().sort({ createdAt: -1 });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single content
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ error: 'Not found' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE content
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { type, title, description, content, linkUrl } = req.body;
    
    const newContent = new Content({
      type,
      title,
      description,
      content,
      linkUrl,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    const saved = await newContent.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE content
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { type, title, description, content, linkUrl } = req.body;
    
    const updateData = { type, title, description, content, linkUrl, updatedAt: new Date() };
    if (req.file) updateData.imageUrl = `/uploads/${req.file.filename}`;

    const updated = await Content.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE content
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Content.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ADD REVIEW
router.post('/:id/reviews', async (req, res) => {
  try {
    const { text } = req.body;
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $push: { reviews: { text } } },
      { new: true }
    );
    if (!content) return res.status(404).json({ error: 'Not found' });
    res.json(content);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE REVIEW
router.delete('/:id/reviews/:reviewId', async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { $pull: { reviews: { _id: req.params.reviewId } } },
      { new: true }
    );
    if (!content) return res.status(404).json({ error: 'Not found' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
