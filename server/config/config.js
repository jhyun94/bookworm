var env = process.env.NODE_ENV || 'development';


if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost/bookworm';
  process.env.JWT_SECRET = 'fmdkalf123'
}
