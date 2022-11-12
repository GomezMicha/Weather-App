const fetch = require("node-fetch"),
  { CityCall_Url: t, Key_Name: e, Key_Value: s } = require("../../variables"),
  handler = async function (a) {
    let r = new URLSearchParams({ ...a.queryStringParameters, [e]: s });
    try {
      let n = await fetch(`${t}?${r}`, {
        headers: { Accept: "application/json" },
      });
      if (!n.ok) return { statusCode: n.status, body: n.statusText };
      let o = await n.json();
      return { statusCode: 200, body: JSON.stringify(o) };
    } catch (i) {
      return (
        console.log(i),
        { statusCode: 500, body: JSON.stringify({ msg: i.message }) }
      );
    }
  };
module.exports = { handler };
