import { writable, derived, readable, get } from "svelte/store";

const baseUrl = "https://api.navitia.io/v1/journeys?";
const urlParams = new URLSearchParams(window.location.search);
let initFrom = { lon: "4.9524123", lat: "52.0444895" };
let initTo = { lon: "4.9524123", lat: "52.1044895" };

if (localStorage.getItem("from")) {
  try {
    initFrom = JSON.parse(localStorage.getItem("from"));
  } catch (error) {}
}

if (localStorage.getItem("to")) {
  try {
    initTo = JSON.parse(localStorage.getItem("to"));
  } catch (error) {}
}

if (urlParams.get("from")) {
  try {
    initFrom = {
      lat: urlParams.get("from").split(";")[0],
      lon: urlParams.get("from").split(";")[1]
    };
  } catch (error) {}
}

if (urlParams.get("to")) {
  try {
    initTo = {
      lat: urlParams.get("to").split(";")[0],
      lon: urlParams.get("to").split(";")[1]
    };
  } catch (error) {}
}

export const from = writable(initFrom);

from.subscribe(val => localStorage.setItem("from", JSON.stringify(val)));

export const to = writable(initTo);

to.subscribe(val => localStorage.setItem("to", JSON.stringify(val)));

export const query = derived([from, to], ([$from, $to]) => {
  return `from=${$from.lon};${$from.lat}&to=${$to.lon};${$to.lat}`;
});

export const url = derived(query, $query => {
  return encodeURI(baseUrl + $query);
});

export const journeys = writable(
  JSON.parse(localStorage.getItem("journeys")) || []
);

export const online = readable(navigator.onLine, function start(set) {
  const handleNetworkChange = () => {
    set(navigator.onLine);
  };

  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);

  return function stop() {
    window.removeEventListener("online", handleNetworkChange);
    window.removeEventListener("offline", handleNetworkChange);
  };
});

journeys.subscribe(val => {
  console.log("updated journeys");
  if (get(online)) {
    localStorage.setItem("journeys", JSON.stringify(val));
  }
});
