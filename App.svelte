<script>
  import Journey from "./Journey.svelte";
  import Navbar from "./Navbar.svelte";
  import { from, to, journeys } from "./stores.js";
  import { getJourneys } from "./functions.js";

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

<Navbar {getJourneys} />

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
      {#if $journeys.length}
        {#each $journeys as journey}
          <Journey {journey} />
        {/each}
      {:else}
        <h2>Duurt ff</h2>
      {/if}
    </div>
  </div>
</main>
