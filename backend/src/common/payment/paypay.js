const { Client, Environment, LogLevel } = require("@paypal/paypal-server-sdk");

const environment = process.env.NODE_ENV === "production" ? Environment.Production : Environment.Sandbox;

const paypalClient = new Client({
  environment,
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_SECRET,
  },
  logging: { logLevel: LogLevel.Info },
});

module.exports = { paypalClient };
