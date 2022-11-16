const fetch = require("node-fetch");
const { WeatherCall_Url, Key_Name, Key_Value } = require("../../variables");

const handler = async function (event) {
  // Get url query parameters
  const params = new URLSearchParams({
    ...event.queryStringParameters,
    [Key_Name]: Key_Value,
  });

  try {
    const response = await fetch(`${WeatherCall_Url}?${params}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    // output to netlify function log
    console.log(error);
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    };
  }
};

module.exports = { handler };
