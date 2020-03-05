import { url, journeys } from "./stores.js";
import { get } from "svelte/store";

let curId;

export async function getJourneys(
  getUrl = get(url),
  n = 0,
  prev = false,
  id = Date.now()
) {
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

  if (res.ok && id == curId) {
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
  }
}
