import express from 'express';
import { Content, Review } from '../models/db.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// GET all content
router.get('/', async (req, res) => {
  try {
    const contents = await Content.findAll({
      include: { association: 'reviews', attributes: { exclude: ['ContentId'] } },
      order: [['createdAt', 'DESC']]
    });
    res.json(contents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single content
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findByPk(req.params.id, {
      include: { association: 'reviews' }
    });
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

    const newContent = await Content.create({
      type,
      title,
      description,
      content,
      linkUrl,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    const fullContent = await Content.findByPk(newContent.id, {
      include: { association: 'reviews' }
    });

    res.status(201).json(fullContent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE content
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { type, title, description, content, linkUrl } = req.body;
    const contentItem = await Content.findByPk(req.params.id);

    if (!contentItem) return res.status(404).json({ error: 'Not found' });

    await contentItem.update({
      type,
      title,
      description,
      content,
      linkUrl,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : contentItem.imageUrl
    });

    const updated = await Content.findByPk(req.params.id, {
      include: { association: 'reviews' }
    });

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE content
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Content.destroy({
      where: { id: req.params.id }
    });

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
    await Review.create({
      text,
      ContentId: req.params.id
    });

    const content = await Content.findByPk(req.params.id, {
      include: { association: 'reviews' }
    });

    if (!content) return res.status(404).json({ error: 'Not found' });
    res.json(content);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE REVIEW
router.delete('/:id/reviews/:reviewId', async (req, res) => {
  try {
    const deleted = await Review.destroy({
      where: { id: req.params.reviewId }
    });

    if (!deleted) return res.status(404).json({ error: 'Review not found' });

    const content = await Content.findByPk(req.params.id, {
      include: { association: 'reviews' }
    });

    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
