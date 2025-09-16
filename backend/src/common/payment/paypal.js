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

const createOrder = async ({ items, currency_code = "BRL", brand_name = "Fireforge Labs", return_url, cancel_url }) => {
  const accessToken = await generateAccessToken();

  // Calcula o valor total dos itens
  const totalValue = items
    .reduce((sum, item) => sum + parseFloat(item.unit_amount.value) * parseInt(item.quantity), 0)
    .toFixed(2);

  const response = await axios.post(
    process.env.PAYPAL_BASE_URL + "/v2/checkout/orders",
    {
      intent: "CAPTURE",
      purchase_units: [
        {
          items,
          amount: {
            currency_code,
            value: totalValue,
            breakdown: {
              item_total: {
                currency_code,
                value: totalValue,
              },
            },
          },
        },
      ],
      application_context: {
        brand_name,
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: return_url || process.env.BASE_URL + "/success",
        cancel_url: cancel_url || process.env.BASE_URL + "/cancel",
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data.links.find((link) => link.rel === "approve").href;
};

module.exports = { createOrder };
