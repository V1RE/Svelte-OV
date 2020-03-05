import { writable, derived } from "svelte/store";

const baseUrl = "https://api.navitia.io/v1/journeys?";

export const from = writable(
  JSON.parse(localStorage.getItem("from")) || {
    lon: "4.6615428",
    lat: "52.1177023"
  }
);

from.subscribe(val => localStorage.setItem("from", JSON.stringify(val)));

export const to = writable(
  JSON.parse(localStorage.getItem("to")) || {
    lon: "4.9524123",
    lat: "52.0444895"
  }
);

to.subscribe(val => localStorage.setItem("to", JSON.stringify(val)));

export const query = derived([from, to], ([$from, $to]) => {
  return `from=${$from.lon};${$from.lat}&to=${$to.lon};${$to.lat}`;
});

export const url = derived(query, $query => {
  return encodeURI(baseUrl + $query);
});
