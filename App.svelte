<script>
  import Journey from "./Journey.svelte";
  import Navbar from "./Navbar.svelte";
  import { from, to, query, url } from "./stores.js";

  let journeys = [];
  let curId;
  let firstRun = true;

  async function getJourneys(
    getUrl = $url,
    n = 0,
    prev = false,
    id = Date.now()
  ) {
    if (!n) {
      journeys = [];
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
        journeys = [currentJourney, ...journeys];
        nextUrl = currentJourney.links[1].href;
      } else {
        journeys = [...journeys, currentJourney];
      }

      if (n < 9) {
        getJourneys(nextUrl, n + 1, prev, id);
      }
    }
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  getJourneys();
</script>

<style>
  main {
    font-family: "Montserrat", sans-serif;
    padding: 1rem;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
  <link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" />
</svelte:head>

<Navbar {getJourneys} {journeys} />

<div
  class="btn"
  on:click={e => {
    to.set({ lon: '4.7615428', lat: '52.1377023' });
    getJourneys();
  }}>
  testting
</div>

<main>
  <div class="container">
    <div class="row">
      {#if journeys.length}
        {#each journeys as journey}
          <Journey {journey} />
        {/each}
      {:else}
        <h2>Duurt ff</h2>
      {/if}
    </div>
  </div>
</main>
