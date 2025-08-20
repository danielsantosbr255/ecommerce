const axios = require("axios");

async function generateAccessToken() {
  const response = await axios({
    method: "POST",
    url: process.env.PAYPAL_BASE_URL + "/v1/oauth2/token",
    data: "grant_type=client_credentials",
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
  });

  return response.data.access_token;
}

exports.createOrder = async () => {
  const accessToken = await generateAccessToken();

  const response = await axios({
    method: "POST",
    url: process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          items: [
            {
              name: "Produto Teste",
              description: "Produto Teste - Descricao",
              quantity: "1",
              unit_amount: {
                currency_code: "BRL",
                value: "10.00",
              },
            },
          ],
          amount: {
            currency_code: "BRL",
            value: "10.00",
            breakdown: {
              item_total: {
                currency_code: "BRL",
                value: "10.00",
              },
            },
          },
        },
      ],
      application_context: {
        brand_name: "Fireforge Labs",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: process.env.BASE_URL + "/success",
        cancel_url: process.env.BASE_URL + "/cancel",
      },
    },
  });

  return response.data.links.find((link) => link.rel === "approve").href;
};
