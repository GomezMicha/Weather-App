# Weather App

Weather app which smoothly integrates with the OpenWeather API to fetch and display current, and 8-day forecasted weather data from around the globe based on search of specific location, Fahrenheit and Celsius temperature units, local time and date, in addition to dynamic icons and images.

Built with:

- **[HTML5](https://github.com/whatwg/html).**
- **[Sass](https://sass-lang.com/).**
- **[JavaScript](https://www.javascript.com/).**
- **[Netlify Functions](https://docs.netlify.com/functions/overview/).**
- **[Open Weather API](https://openweathermap.org/api).**
- **[Bootstrap CDN](https://icons.getbootstrap.com/).**

:triangular_flag_on_post: *To anyone who wishes to make commits and push their own code, just make sure you fork the project first to have a copy of this repository.*

## Getting Started

You will need **[Node.js](https://nodejs.org/en/download/)** and **[Git](https://git-scm.com/)** installed and running on your local machine.

Fork this repository to have your own copy in your GitHub profile. After forking this project, just clone it, then you can commit and push to it freely.

## How To Use

In the terminal on your local machine after you have cloned the project:

### Install all dependencies

In the terminal on your local machine after you have cloned the project:

`$ npm install` or `$ yarn install`

`$ npm install netlify-cli -g` globally or `$ npm install netlify-cli --save-dev` CI environment.

Visit **[Open Weather API](https://openweathermap.org/api)** to sign up and get your own API key. Once you get your API key create an .env file in the root of the directory and add these variables.

`WeatherCall_Url = "https://api.openweathermap.org/data/2.5/onecall"`

`CityCall_Url = "http://api.openweathermap.org/geo/1.0/direct"`

`Key_Name = "appid"`

`Key_Value = "Your API key here"`

### Start development server

`$ netlify dev` or `$ ./node_modules/.bin/netlify dev`

Runs the app in the development mode.\
Open [http://localhost:8888](http://localhost:8888) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### License :page_with_curl:

This project is licensed under the MIT License. Read the **LICENSE** file for additional details.
