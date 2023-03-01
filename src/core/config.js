require("dotenv").config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_TEST_URI: process.env.MONGODB_TEST_URI,
  JWT_SECRETE_KEY: process.env.JWT_SECRETE_KEY,
  PORT: process.env.PORT || 7000,
  TOKEN_DURATION: "720h",
  CONNECTION_TIMEOUT: process.env.CONNECTION_TIMEOUT,
  DEFAULT_IMAGE_URL: process.env.DEFAULT_IMAGE_URL,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  VERIFIED_EMAIL: process.env.VERIFIED_EMAIL,
  PLAN_ID: process.env.PLAN_ID,
  FLW_PUBLIC_KEY: process.env.FLW_PUBLIC_KEY,
  FLW_SECRET_KEY: process.env.FLW_SECRET_KEY,
  REDIS_URL: process.env.REDIS_URL,
  OTP_DURATION: process.env.OTP_DURATION,
  KOBO_RATE: process.env.KOBO_RATE,
  AMOUNT: process.env.AMOUNT,
  DAILY_CRON_SCHEDULE: process.env.DAILY_CRON_SCHEDULE,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
  BACKEND_BASE_URL: process.env.BACKEND_BASE_URL
};
