import {
  url,
  journeys,
  online,
  from,
  to,
  dateTime,
  dateTimeRepresents,
  toastMessage
} from "./stores.js";
import { get } from "svelte/store";

let curId;

export async function getJourneys(
  getUrl = get(url),
  n = 0,
  prev = false,
  id = Date.now()
) {
  if (get(online)) {
    if (get(from).lat && get(to).lat) {
      if (!n) {
        journeys.set([]);
        curId = id;
      }

      const res = await fetch(getUrl, {
        headers: {
          Authorization: "bee578e7-45b6-44f4-b317-fd0aad5ae32f"
        }
      });
      const currentJourney = await res.json();

      if (id == curId) {
        if (res.ok) {
          console.log({ ...currentJourney, getUrl });
          let nextUrl = currentJourney.links[0].href;

          if (prev) {
            journeys.set([currentJourney, ...get(journeys)]);
            nextUrl = currentJourney.links[1].href;
          } else {
            journeys.set([...get(journeys), currentJourney]);
          }

          if (n < 9) {
            getJourneys(nextUrl, n + 1, prev, id);
          }
        } else {
          console.log(res);
        }
      }
    }
  } else {
    journeys.set(JSON.parse(localStorage.getItem("journeys")) || []);
  }
}

export function subscribe() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  if (window.location.pathname == "/") {
    history.replaceState(null, "", "/");
  }

  from.subscribe(e => {
    if (Object.keys(e).length) {
      localStorage.setItem("from", JSON.stringify(e));
      appendHistory(e);
      getJourneys();
    }
  });

  to.subscribe(e => {
    if (Object.keys(e).length) {
      localStorage.setItem("to", JSON.stringify(e));
      appendHistory(e);
      getJourneys();
    }
  });

  dateTime.subscribe(e => {
    if (Object.keys(e).length) {
      getJourneys();
    }
  });

  dateTimeRepresents.subscribe(e => {
    if (Object.keys(e).length) {
      getJourneys();
    }
  });

  toastMessage.subscribe(e => {
    if (Object.keys(e).length) {
      setTimeout(() => {
        toastMessage.set("");
      }, 2500);
    }
  });
}

export function appendHistory(location) {
  if (location.name) {
    let history = JSON.parse(localStorage.getItem("history")) || [location];
    history = [location, ...history];
    console.log(history);
    history = history.filter(
      (thing, index, self) =>
        index === self.findIndex(t => t.name === thing.name)
    );
    localStorage.setItem("history", JSON.stringify(history));
  }
}
