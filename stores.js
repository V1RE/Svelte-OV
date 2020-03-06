import { writable, derived, readable, get } from "svelte/store";

const baseUrl = "https://api.navitia.io/v1/journeys?";

export const from = writable(
  JSON.parse(localStorage.getItem("from")) || {
    lon: "4.6615428",
    lat: "52.1177023",
    name: "Alphen aan den Rijn"
  }
);

from.subscribe(val => localStorage.setItem("from", JSON.stringify(val)));

export const to = writable(
  JSON.parse(localStorage.getItem("to")) || {
    lon: "4.9524123",
    lat: "52.0444895",
    name: "Montfoort"
  }
);

to.subscribe(val => localStorage.setItem("to", JSON.stringify(val)));

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
