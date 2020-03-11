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

  from.subscribe(e => {
    if (e) {
      getJourneys();
    }
  });

  to.subscribe(e => {
    if (e) {
      getJourneys();
    }
  });

  dateTime.subscribe(e => {
    if (e) {
      getJourneys();
    }
  });

  dateTimeRepresents.subscribe(e => {
    if (e) {
      getJourneys();
    }
  });

  toastMessage.subscribe(e => {
    if (e) {
      setTimeout(() => {
        toastMessage.set("");
      }, 2500);
    }
  });
}
