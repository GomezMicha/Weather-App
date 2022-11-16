"use strict";

// Global Variabes.
const mainIcon = document.querySelector(".icon");
const dailyInfoWrapper = document.getElementById("daily-info-wrapper");
const dailyInfo = document.querySelectorAll(".daily-info");
const previousBtn = document.querySelector(".previous");
const nextBtn = document.querySelector(".next");
const searchCity = document.getElementById("search-city");
const cityDropdowm = document.querySelector(".city-dropdown");
const searchCityBtn = document.querySelector(".bi-search");
const fahrenheit = document.getElementById("fahrenheit");
const celsius = document.getElementById("celsius");
const base_url = "/.netlify/functions/";

// Check if there's a location value if not set default location value.
let initialLocationObject = localStorage.getItem("Location")
  ? JSON.parse(localStorage.getItem("Location"))
  : {
      name: "Bogotá",
      state: undefined,
      country: "CO",
      lat: 4.6533326,
      lon: -74.083652,
    };

// Fetch Weather data from API
async function fetchWeatherData(apiUrl, unitsSymbol) {
  try {
    const res = await fetch(apiUrl);
    let { timezone, current, daily } = await res.json();
    updateDom(current, timezone, unitsSymbol);
    createDailyInfo(daily, timezone, unitsSymbol);
  } catch (error) {
    console.log(error);
  }
}

// Update DOM
function updateDom(current, timezone, units) {
  // Change container background image dynamically.
  document.getElementById("container").style.backgroundImage = `url(${
    weatherIcons[current.weather[0].icon]["img"]
  })`;

  // Update DOM Left Section
  const currentDate = document.getElementById("current-date");
  currentDate.textContent = convertDate(current.dt, timezone, "long");

  // Add weather Icon dinamycally
  createIconAndH2(current);

  // Update DOM Right Section
  const currentTime = document.getElementById("current-time");
  currentTime.textContent = "";
  const [time, meridian] = convertTime(current.dt, timezone).split(" ");
  const div = document.createElement("div");
  const span = document.createElement("span");
  div.textContent = time;
  span.textContent = meridian;
  div.appendChild(span);
  currentTime.appendChild(div);

  const currentTemp = document.getElementById("degrees");
  const infoSpan = document.querySelectorAll(".info span");
  currentTemp.textContent = `${Math.round(current.temp)}°`;
  infoSpan[0].textContent = `${Math.round(current.feels_like)}${units}`;
  infoSpan[1].textContent = `${current.humidity}%`;
  infoSpan[2].textContent = `${current.visibility / 1000} km`;
  infoSpan[3].textContent = `${current.pressure}hPa`;
  infoSpan[4].textContent = `${current.wind_speed} ${
    units === "°C" ? "m/s" : "mph"
  }`;
}

// Capitalize First letter of a word.
function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.substring(1);
}

// Create icon and text elements for the Main section
function createIconAndH2(current) {
  mainIcon.textContent = "";
  const weatherIcon = document.createElement("i");
  weatherIcon.classList.add(
    "bi",
    `${weatherIcons[current.weather[0].icon]["icon"]}`
  );
  const H2 = document.createElement("h2");
  H2.textContent = capitalizeFirstLetter(current.weather[0].description);
  // H2.textContent = `${current.weather[0].description}`;
  mainIcon.append(weatherIcon, H2);
}

// Convert Timestamps into weekday, month, and day.
function convertDate(timeStamp, timezone, weekday) {
  let options = {
    weekday: weekday,
    month: "short",
    day: "numeric",
    timeZone: timezone,
  };

  let _currentDate = new Date(timeStamp * 1000).toLocaleString(
    "en-US",
    options
  );
  return _currentDate;
}

// Convert Timestpams into hour, minute, and meridiem.
function convertTime(timeStamp, timezone) {
  let _options = {
    hour: "numeric",
    minute: "numeric",
    timeZone: timezone,
  };

  let _currentTime = new Date(timeStamp * 1000).toLocaleString(
    "en-US",
    _options
  );
  return _currentTime;
}

// Create daily info items and update the DOM
function createDailyInfo(daily, timezone, units) {
  daily.forEach((day, i) => {
    dailyInfo[i].textContent = "";
    // Daily info Header
    const dailyInfoHeader = document.createElement("div");
    dailyInfoHeader.classList.add("dailyInfo-header");
    const dailyInfoHeaderH2 = document.createElement("h2");
    dailyInfoHeaderH2.textContent = convertDate(day.dt, timezone, "short");
    // Daily Info Inner Wrapper
    const innerWrapper = document.createElement("div");
    innerWrapper.classList.add("inner-wrapper");
    //Inner Wrapper Div and elements
    const div = document.createElement("div");
    const pTag = document.createElement("p");
    pTag.textContent = capitalizeFirstLetter(day.weather[0].description);
    const weatherIcon = document.createElement("i");
    weatherIcon.classList.add(
      "bi",
      `${weatherIcons[day.weather[0].icon]["icon"]}`
    );
    const minMax = document.createElement("span");
    minMax.classList.add("min-max");
    minMax.textContent = `${Math.round(day.temp.min)}${units} – ${Math.round(
      day.temp.max
    )}${units}`;
    // Div and elements to hide/show
    const hide = document.createElement("div");
    hide.classList.add("hide");
    const hidePtag_0 = createPtag(
      "Dew Point",
      Math.round(day.dew_point),
      false,
      units
    );
    const hidePtag_1 = createPtag(
      "Sunrise",
      convertTime(day.sunrise, timezone),
      true
    );
    const hidePtag_2 = createPtag(
      "Sunset",
      convertTime(day.sunset, timezone),
      true
    );

    // Append elements.
    hide.append(hidePtag_0, hidePtag_1, hidePtag_2);
    div.append(pTag, weatherIcon, minMax);
    innerWrapper.append(div, hide);
    dailyInfoHeader.appendChild(dailyInfoHeaderH2);
    dailyInfo[i].append(dailyInfoHeader, innerWrapper);
  });
}

// Create paragraph tag dynamically.
function createPtag(pTagValue, spanTagValue, boolean, units) {
  const hidePTag = document.createElement("p");
  hidePTag.classList.add("info");
  hidePTag.textContent = pTagValue;
  const hidePTagSpan = document.createElement("span");
  hidePTagSpan.textContent = `${boolean ? spanTagValue : spanTagValue + units}`;
  hidePTag.appendChild(hidePTagSpan);
  return hidePTag;
}

// Add and remove expand class
dailyInfo.forEach((element) => {
  element.addEventListener("click", () => {
    removeExpandClass();
    element.classList.add("expand");
  });
});

function removeExpandClass() {
  dailyInfo.forEach((element) => {
    element.classList.remove("expand");
  });
}

// Capture Search Value and use it for the Geolocation API.
function getSearchCity() {
  if (searchCity.value) {
    let searchCityValue = searchCity.value;
    geoCoordinates(searchCityValue);
  } else {
    return null;
  }
}

// Get data and geographical coordinates by name of location.(Up to 5 locations).
async function geoCoordinates(searchCityValue) {
  const geoCodingApiUrl = `${base_url}fetch-cities?q=${searchCityValue}&limit=5`;
  try {
    const res = await fetch(geoCodingApiUrl);
    const data = await res.json();
    updateDropdown(data);
  } catch (error) {
    console.log(error);
  }
}

// Create and Update dropdown list of locations in DOM.
function updateDropdown(locationsData) {
  locationsData = locationsData.length
    ? locationsData
    : [{ name: "Location Not Found", state: "", country: "" }];
  cityDropdowm.textContent = "";
  // Create li element and update information dinamically.
  locationsData.forEach((location) => {
    const { name, state, country } = location;
    const li = document.createElement("li");
    li.textContent = `${name}, ${state ? state + "," : ""} ${country}`;
    li.addEventListener("click", () => {
      updateLocation(location);
    });
    // Create img element to show country flag.
    const img = document.createElement("img");
    img.classList.add("flag");
    img.setAttribute(
      "src",
      `https://openweathermap.org/images/flags/${country.toLowerCase()}.png`
    );

    // Append elements.
    li.appendChild(img);
    cityDropdowm.appendChild(li);
  });
  cityDropdowm.style.display = "inline-block";
}

// Get specific location data through latitude and longitude of the given location.
function updateLocation(locationData) {
  // Store current location object in Local Storage.
  localStorage.setItem("Location", JSON.stringify(locationData));

  // Check if there's a value in local storage if not set the default value of the variable to metric.
  let units = localStorage.getItem("Unit")
    ? localStorage.getItem("Unit")
    : "metric";

  const { name, state, country, lat, lon } = locationData;
  // Update DOM.
  const cityName = document.querySelector(".location-name");
  cityName.textContent = `${
    state === undefined
      ? `${name}, ${country}`
      : `${name}, ${state}, ${country}`
  }`;
  const unitsSymbol = units === "metric" ? "°C" : "°F";
  const apiUrl = `${base_url}fetch-weather?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=${units}`;
  fetchWeatherData(apiUrl, unitsSymbol);
}

// Enable - Disable units button
function enableDisableUnits() {
  localStorage.getItem("Unit") === "imperial"
    ? ((fahrenheit.disabled = true), (celsius.disabled = false))
    : ((celsius.disabled = true), (fahrenheit.disabled = false));
}

// Event Listeners
// Scroll to the end of Daily Info Wrapper Content
nextBtn.addEventListener("click", () => {
  dailyInfoWrapper.scrollLeft += dailyInfoWrapper.offsetWidth;
});

// Scroll to the beginning of the Daily info Wrapper Content
previousBtn.addEventListener("click", () => {
  dailyInfoWrapper.scrollLeft -= dailyInfoWrapper.offsetWidth;
});

// Hide and Show Previous and Next Buttons based on Daily Info Wrapper scroll.
dailyInfoWrapper.addEventListener("scroll", () => {
  let scrollLeft = dailyInfoWrapper.scrollLeft;
  let clientWidth = dailyInfoWrapper.clientWidth;
  switch (true) {
    case scrollLeft === 0:
      previousBtn.style.display = "none";
      nextBtn.style.display = "inline-block";
      break;
    case scrollLeft >= 288 && clientWidth === 1030:
      nextBtn.style.display = "none";
      break;
    case scrollLeft >= 330 && clientWidth === 680:
      nextBtn.style.display = "none";
      break;
    case scrollLeft >= 430 && clientWidth === 884:
      nextBtn.style.display = "none";

      break;
    case scrollLeft > 580 && clientWidth === 735:
      nextBtn.style.display = "none";
      break;
    default:
      previousBtn.style.display = "inline-block";
      nextBtn.style.display = "inline-block";
      break;
  }
});

// Hide locations dropdown menu when clicking anywhere in the window.
window.addEventListener("click", (event) => {
  event.target !== cityDropdowm ? (cityDropdowm.style.display = "none") : false;
});

// Get value from Search Location
searchCityBtn.addEventListener("click", getSearchCity);

// Refresh Page
document.querySelector(".refresh-wrapper").addEventListener("click", () => {
  initialLocationObject = JSON.parse(localStorage.getItem("Location"));
  updateLocation(initialLocationObject);
});

// ----------------------------------------------------
function eventListenerSetter(units, locationObject) {
  localStorage.setItem("Unit", units);
  updateLocation(locationObject);
  enableDisableUnits();
}

fahrenheit.addEventListener("click", () => {
  initialLocationObject = JSON.parse(localStorage.getItem("Location"));
  eventListenerSetter("imperial", initialLocationObject);
});

celsius.addEventListener("click", () => {
  initialLocationObject = JSON.parse(localStorage.getItem("Location"));
  eventListenerSetter("metric", initialLocationObject);
});

// On Load
enableDisableUnits();
updateLocation(initialLocationObject);
