"use strict";
const weatherIcons = {
  "01d": {
    icon: "bi-brightness-high",
    img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  "01n": {
    icon: "bi-moon-stars",
    img: "https://images.unsplash.com/photo-1468186402854-9a641fd7a7c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
  },
  "02d": {
    icon: "bi-cloud-sun",
    img: "https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1584&q=80",
  },
  "02n": {
    icon: "bi-cloud-moon",
    img: "https://images.unsplash.com/photo-1610875185232-4fcb2d8b3035?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  "03d": {
    icon: "bi-cloudy",
    img: "https://images.unsplash.com/photo-1598717123623-994ab270a08e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
  },
  "03n": {
    icon: "bi-cloudy",
    img: "https://images.unsplash.com/photo-1599045151332-ff2587f03eb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  "04d": {
    icon: "bi-clouds",
    img: "https://images.unsplash.com/photo-1583755689194-210010d31d21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  "04n": {
    icon: "bi-clouds",
    img: "https://images.unsplash.com/photo-1533983272060-edb6f56af634?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1323&q=80",
  },
  "09d": {
    icon: "bi-cloud-drizzle",
    img: "https://images.unsplash.com/photo-1517964101322-a4cfaaf56e5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  "09n": {
    icon: "bi-cloud-drizzle",
    img: "https://images.unsplash.com/photo-1571074802462-a4c9bcdd69f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  "10d": {
    icon: "bi-cloud-rain",
    img: "https://images.unsplash.com/photo-1438260483147-81148f799f25?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
  },
  "10n": {
    icon: "bi-cloud-rain",
    img: "https://images.unsplash.com/photo-1499184949561-704bad5f6cd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  "11d": {
    icon: "bi-cloud-lightning-rain",
    img: "https://images.unsplash.com/photo-1475116127127-e3ce09ee84e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  "11n": {
    icon: "bi-cloud-lightning-rain",
    img: "https://images.unsplash.com/photo-1465799522714-8eb0e6fccf73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1313&q=80",
  },
  "13d": {
    icon: "bi-snow2",
    img: "https://images.unsplash.com/photo-1577457943926-11193adc0563?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1804&q=80",
  },
  "13n": {
    icon: "bi-snow2",
    img: "https://images.unsplash.com/photo-1514969655361-1dbc3731d4cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  "50d": {
    icon: "bi-cloud-fog2",
    img: "https://images.unsplash.com/photo-1543685718-068bf6669cb3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  "50n": {
    icon: "bi-cloud-fog2",
    img: "https://images.unsplash.com/photo-1634461909815-fbfe910c162c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80",
  },
};
