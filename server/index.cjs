import { initApp } from "./app";

const start = async () => {
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

  const app = await initApp();

  return app;
}

module.exports = start();
