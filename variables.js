require("dotenv").config();

const WeatherCall_Url = process.env.WeatherCall_Url;
const CityCall_Url = process.env.CityCall_Url;
const Key_Name = process.env.Key_Name;
const Key_Value = process.env.Key_Value;

module.exports = { WeatherCall_Url, CityCall_Url, Key_Name, Key_Value };
