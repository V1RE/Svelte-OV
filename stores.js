import { writable, derived, readable, get } from "svelte/store";
import moment from "moment";

const baseUrl = "https://api.navitia.io/v1/journeys?";
const urlParams = new URLSearchParams(window.location.search);
let initFrom = {};
let initTo = {};

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
      lon: urlParams.get("from").split(";")[0],
      lat: urlParams.get("from").split(";")[1]
    };
  } catch (error) {}
}

if (urlParams.get("to")) {
  try {
    initTo = {
      lon: urlParams.get("to").split(";")[0],
      lat: urlParams.get("to").split(";")[1]
    };
  } catch (error) {}
}

export const from = writable(initFrom);

from.subscribe(val => localStorage.setItem("from", JSON.stringify(val)));

export const to = writable(initTo);

to.subscribe(val => localStorage.setItem("to", JSON.stringify(val)));

export const dateTime = writable(moment().toISOString());

export const query = derived([from, to], ([$from, $to]) => {
  return `from=${$from.lon};${$from.lat}&to=${$to.lon};${$to.lat}`;
});

export const url = derived(query, $query => {
  console.log(encodeURI(baseUrl + $query));
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
  if (get(online)) {
    localStorage.setItem("journeys", JSON.stringify(val));
  }
});
