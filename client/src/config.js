const config = {};

if (process.env.NODE_ENV === "production") {
  config.port = "https://flafi.hu:2053/jsthings/imagewall";
} else {
  config.port = "";
}

module.exports = config;
