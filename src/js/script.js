const mainIcon = document.querySelector(".icon"),
  dailyInfoWrapper = document.getElementById("daily-info-wrapper"),
  dailyInfo = document.querySelectorAll(".daily-info"),
  previousBtn = document.querySelector(".previous"),
  nextBtn = document.querySelector(".next"),
  searchCity = document.getElementById("search-city"),
  cityDropdowm = document.querySelector(".city-dropdown"),
  searchCityBtn = document.querySelector(".bi-search"),
  fahrenheit = document.getElementById("fahrenheit"),
  celsius = document.getElementById("celsius"),
  base_url = "/.netlify/functions/";
let initialLocationObject = localStorage.getItem("Location")
  ? JSON.parse(localStorage.getItem("Location"))
  : {
      name: "Bogot\xe1",
      state: void 0,
      country: "CO",
      lat: 4.6533326,
      lon: -74.083652,
    };
async function fetchWeatherData(e, t) {
  try {
    let n = await fetch(e),
      { timezone: i, current: a, daily: o } = await n.json();
    updateDom(a, i, t), createDailyInfo(o, i, t);
  } catch (r) {
    console.log(r);
  }
}
function updateDom(e, t, n) {
  document.getElementById("container").style.backgroundImage = `url(${
    weatherIcons[e.weather[0].icon].img
  })`;
  let i = document.getElementById("current-date");
  (i.textContent = convertDate(e.dt, t, "long")), createIconAndH2(e);
  let a = document.getElementById("current-time");
  a.textContent = "";
  let [o, r] = convertTime(e.dt, t).split(" "),
    l = document.createElement("div"),
    c = document.createElement("span");
  (l.textContent = o), (c.textContent = r), l.appendChild(c), a.appendChild(l);
  let s = document.getElementById("degrees"),
    d = document.querySelectorAll(".info span");
  (s.textContent = `${Math.round(e.temp)}\xb0`),
    (d[0].textContent = `${Math.round(e.feels_like)}${n}`),
    (d[1].textContent = `${e.humidity}%`),
    (d[2].textContent = `${e.visibility / 1e3} km`),
    (d[3].textContent = `${e.pressure}hPa`),
    (d[4].textContent = `${e.wind_speed} ${"\xb0C" === n ? "m/s" : "mph"}`);
}
function capitalizeFirstLetter(e) {
  return e[0].toUpperCase() + e.substring(1);
}
function createIconAndH2(e) {
  mainIcon.textContent = "";
  let t = document.createElement("i");
  t.classList.add("bi", `${weatherIcons[e.weather[0].icon].icon}`);
  let n = document.createElement("h2");
  (n.textContent = capitalizeFirstLetter(e.weather[0].description)),
    mainIcon.append(t, n);
}
function convertDate(e, t, n) {
  return new Date(1e3 * e).toLocaleString("en-US", {
    weekday: n,
    month: "short",
    day: "numeric",
    timeZone: t,
  });
}
function convertTime(e, t) {
  return new Date(1e3 * e).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    timeZone: t,
  });
}
function createDailyInfo(e, t, n) {
  e.forEach((e, i) => {
    dailyInfo[i].textContent = "";
    let a = document.createElement("div");
    a.classList.add("dailyInfo-header");
    let o = document.createElement("h2");
    o.textContent = convertDate(e.dt, t, "short");
    let r = document.createElement("div");
    r.classList.add("inner-wrapper");
    let l = document.createElement("div"),
      c = document.createElement("p");
    c.textContent = capitalizeFirstLetter(e.weather[0].description);
    let s = document.createElement("i");
    s.classList.add("bi", `${weatherIcons[e.weather[0].icon].icon}`);
    let d = document.createElement("span");
    d.classList.add("min-max"),
      (d.textContent = `${Math.round(e.temp.min)}${n} – ${Math.round(
        e.temp.max
      )}${n}`);
    let p = document.createElement("div");
    p.classList.add("hide");
    let m = createPtag("Dew Point", Math.round(e.dew_point), !1, n),
      u = createPtag("Sunrise", convertTime(e.sunrise, t), !0),
      y = createPtag("Sunset", convertTime(e.sunset, t), !0);
    p.append(m, u, y),
      l.append(c, s, d),
      r.append(l, p),
      a.appendChild(o),
      dailyInfo[i].append(a, r);
  });
}
function createPtag(e, t, n, i) {
  let a = document.createElement("p");
  a.classList.add("info"), (a.textContent = e);
  let o = document.createElement("span");
  return (o.textContent = `${n ? t : t + i}`), a.appendChild(o), a;
}
function removeExpandClass() {
  dailyInfo.forEach((e) => {
    e.classList.remove("expand");
  });
}
function getSearchCity() {
  if (!searchCity.value) return null;
  geoCoordinates(searchCity.value);
}
async function geoCoordinates(e) {
  let t = `${base_url}fetch-cities?q=${e}&limit=5`;
  try {
    let n = await fetch(t),
      i = await n.json();
    updateDropdown(i);
  } catch (a) {
    console.log(a);
  }
}
function updateDropdown(e) {
  (e = e.length ? e : [{ name: "Location Not Found", state: "", country: "" }]),
    (cityDropdowm.textContent = ""),
    e.forEach((e) => {
      let { name: t, state: n, country: i } = e,
        a = document.createElement("li");
      (a.textContent = `${t}, ${n ? n + "," : ""} ${i}`),
        a.addEventListener("click", () => {
          updateLocation(e);
        });
      let o = document.createElement("img");
      o.classList.add("flag"),
        o.setAttribute(
          "src",
          `https://openweathermap.org/images/flags/${i.toLowerCase()}.png`
        ),
        a.appendChild(o),
        cityDropdowm.appendChild(a);
    }),
    (cityDropdowm.style.display = "inline-block");
}
function updateLocation(e) {
  localStorage.setItem("Location", JSON.stringify(e));
  let t = localStorage.getItem("Unit")
      ? localStorage.getItem("Unit")
      : "metric",
    { name: n, state: i, country: a, lat: o, lon: r } = e,
    l = document.querySelector(".location-name");
  l.textContent = `${void 0 === i ? `${n}, ${a}` : `${n}, ${i}, ${a}`}`;
  let c = `${base_url}fetch-weather?lat=${o}&lon=${r}&exclude=minutely,hourly&units=${t}`;
  fetchWeatherData(c, "metric" === t ? "\xb0C" : "\xb0F");
}
function enableDisableUnits() {
  "imperial" === localStorage.getItem("Unit")
    ? ((fahrenheit.disabled = !0), (celsius.disabled = !1))
    : ((celsius.disabled = !0), (fahrenheit.disabled = !1));
}
function eventListenerSetter(e, t) {
  localStorage.setItem("Unit", e), updateLocation(t), enableDisableUnits();
}
dailyInfo.forEach((e) => {
  e.addEventListener("click", () => {
    removeExpandClass(), e.classList.add("expand");
  });
}),
  nextBtn.addEventListener("click", () => {
    dailyInfoWrapper.scrollLeft += dailyInfoWrapper.offsetWidth;
  }),
  previousBtn.addEventListener("click", () => {
    dailyInfoWrapper.scrollLeft -= dailyInfoWrapper.offsetWidth;
  }),
  dailyInfoWrapper.addEventListener("scroll", () => {
    let e = dailyInfoWrapper.scrollLeft,
      t = dailyInfoWrapper.clientWidth;
    switch (!0) {
      case 0 === e:
        (previousBtn.style.display = "none"),
          (nextBtn.style.display = "inline-block");
        break;
      case e >= 288 && 1030 === t:
      case e >= 330 && 680 === t:
      case e >= 430 && 884 === t:
      case e > 580 && 735 === t:
        nextBtn.style.display = "none";
        break;
      default:
        (previousBtn.style.display = "inline-block"),
          (nextBtn.style.display = "inline-block");
    }
  }),
  window.addEventListener("click", (e) => {
    e.target !== cityDropdowm && (cityDropdowm.style.display = "none");
  }),
  searchCityBtn.addEventListener("click", getSearchCity),
  document.querySelector(".refresh-wrapper").addEventListener("click", () => {
    updateLocation(
      (initialLocationObject = JSON.parse(localStorage.getItem("Location")))
    );
  }),
  fahrenheit.addEventListener("click", () => {
    eventListenerSetter(
      "imperial",
      (initialLocationObject = JSON.parse(localStorage.getItem("Location")))
    );
  }),
  celsius.addEventListener("click", () => {
    eventListenerSetter(
      "metric",
      (initialLocationObject = JSON.parse(localStorage.getItem("Location")))
    );
  }),
  enableDisableUnits(),
  updateLocation(initialLocationObject);
