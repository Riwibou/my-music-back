const { Blog } = require('../databases/blog.database');
const { cloudinary } = require('../config/cloudinary.config');
const multer = require('multer');
const streamifier = require('streamifier');

const upload = multer();

exports.uploadBlogImage = (req, res) => {
  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).send({ error: err.message });
    }

    try {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload(req);
      res.status(200).send({ imageUrl: result.secure_url });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
};

exports.addBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body);
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).send({ error: 'Blog not found' });
    }
    res.send(blog);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).send({ error: 'Blog not found' });
    }
    res.send({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send({ error: 'Blog not found' });
    }
    res.send(blog);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
