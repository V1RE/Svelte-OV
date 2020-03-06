<script>
  import Journey from "./Journey.svelte";
  import Navbar from "./Navbar.svelte";
  import Alert from "./Alert.svelte";
  import { from, to, journeys, online } from "./stores.js";
  import { getJourneys } from "./functions.js";
  import { onMount } from "svelte";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  onMount(() => {
    getJourneys();
  });
</script>

<style>
  main {
    font-family: "Montserrat", sans-serif;
    padding: 1rem;
  }

  :global(.container) {
    padding: 0;
  }
</style>

<Navbar {getJourneys} />

<main>
  <div class="container">
    <Alert />
    {#if $journeys.length}
      {#each $journeys as journey}
        <Journey {journey} />
      {/each}
    {:else}
      <h2>Duurt ff</h2>
    {/if}
  </div>
</main>
