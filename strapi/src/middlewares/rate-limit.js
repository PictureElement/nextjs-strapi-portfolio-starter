const { RateLimit } = require("koa2-ratelimit");

module.exports = (config, { strapi }) => {
  return async (context, next) => {
    return RateLimit.middleware({
      interval: { min: 5 }, // 5 minutes
      max: 1000, // limit each IP to 1000 requests per interval
      message: "Too many requests, please try again later.",
      headers: true,
    })(context, next);
  };
};
