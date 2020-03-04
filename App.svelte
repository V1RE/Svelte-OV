<script>
  import Journey from "./Journey.svelte";
  import Navbar from "./Navbar.svelte";

  let journeys = [];
  let nikitaUrl =
    "https://api.navitia.io/v1/journeys?from=4.6615428%3B52.1177023&to=4.9524123%3B52.0444895";
  let nielsUrl =
    "https://api.navitia.io/v1/journeys?from=4.9524123%3B52.0444895&to=4.6615428%3B52.1177023";
  let curUrl = nikitaUrl;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  async function getJourneys(url = curUrl, n = 0, prev = false) {
    if (!n) {
      journeys = [];
    }

    const res = await fetch(url, {
      headers: {
        Authorization: "bee578e7-45b6-44f4-b317-fd0aad5ae32f"
      }
    });
    const currentJourney = await res.json();

    if (res.ok) {
      let nextUrl = currentJourney.links[0].href;

      if (prev) {
        journeys = [currentJourney, ...journeys].slice(0, 10);
        nextUrl = currentJourney.links[1].href;
      } else {
        journeys = [...journeys, currentJourney].slice(0, 10);
      }

      if (n < 9) {
        getJourneys(nextUrl, n + 1, prev);
      }
    }
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
  class="btn btn-secondary"
  on:click={e => {
    if (curUrl == nikitaUrl) {
      curUrl = nielsUrl;
    } else {
      curUrl = nikitaUrl;
    }
    getJourneys();
  }}>
  Switch
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
