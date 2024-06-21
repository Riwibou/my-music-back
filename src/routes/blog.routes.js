const express = require('express');
const router = express.Router();
const { addBlog, updateBlog, deleteBlog, getBlog, getAllBlogs, uploadBlogImage } = require('../controllers/blog.controller');

router.post('/', addBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlogs);
router.post('/upload-image', uploadBlogImage);

module.exports = router;
