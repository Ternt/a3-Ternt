const initApp     = require('./app.cjs');
const dotenv      = require('dotenv').config();

const start = () => {
  if (!process.env.PORT ||
    !process.env.HOST ||
    !process.env.EXPRESS_SESSION_SECRET ||
    !process.env.GITHUB_CLIENT_ID ||
    !process.env.GITHUB_CLIENT_SECRET ||
    !process.env.MONGO_USER ||
    !process.env.MONGO_HOST ||
    !process.env.MONGO_PASS
  ) {
    console.error("Please set app env variables");
  }

  const app = initApp();
  app.listen(process.env.PORT, () => {
    console.log(`Server listening`)
  });

  return app;
}

module.exports = start();
