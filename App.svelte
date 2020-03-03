<script>
  import Journey from "./Journey.svelte";
  import {
    mdiHistory,
    mdiArrowRightCircleOutline,
    mdiArrowLeftCircleOutline
  } from "@mdi/js";
  import Mdicon from "mdi-svelte";

  let journeys = [];

  async function getJourneys(
    url = "https://api.navitia.io/v1/journeys?from=4.9524123%3B52.0444895&to=4.6615428%3B52.1177023",
    n = 0,
    prev = false
  ) {
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

<main>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1
          on:click={e => {
            getJourneys();
          }}>
          🥖 Radar
        </h1>
        <div class="btn-group">
          <div
            class="btn btn-primary"
            on:click={e => {
              getJourneys(journeys[0].links[1].href, 0, true);
            }}>
            <Mdicon path={mdiArrowLeftCircleOutline} />
          </div>
          <div
            class="btn btn-primary"
            on:click={e => {
              getJourneys();
            }}>
            <Mdicon path={mdiHistory} />
          </div>
          <div
            class="btn btn-primary"
            on:click={e => {
              getJourneys(journeys[journeys.length - 1].links[0].href, 0);
            }}>
            <Mdicon path={mdiArrowRightCircleOutline} />
          </div>
        </div>
      </div>
    </div>
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
