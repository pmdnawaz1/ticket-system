module.exports = {
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ticketing',
    JWT_SECRET: process.env.JWT_SECRET || 'mysecretkey',
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_PORT: process.env.SMTP_PORT || 587,
    SMTP_USER: process.env.SMTP_USER || 'youremail@gmail.com',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || 'yourpassword'
  };
  