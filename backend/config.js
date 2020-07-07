const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 4000,
  MONGODB_URL: process.env.MONGODB_URL || "mongodb://localhost/pizzasystem",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
  SESSION_INIT_ID: process.env.SESSION_INIT_ID || "1",
};
