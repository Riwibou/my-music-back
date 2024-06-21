const userRoutes = require('./user.routes');
const musicRoutes = require('./music.routes');
const blogRoutes = require('./blog.routes');
const paymentRoutes = require('./payment.routes');

module.exports = (app) => {
  app.use('/api/users', userRoutes);
  app.use('/api/musics', musicRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/payments', paymentRoutes);
};

