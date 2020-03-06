<script>
  import Navbar from "./Navbar.svelte";
  import Alerts from "./Alerts.svelte";
  import Journeys from "./Journeys.svelte";
  import { getJourneys } from "./functions.js";
  import { from } from "./stores.js";

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

  :global(.container) {
    padding: 0;
  }
</style>

<Navbar {getJourneys} />

<main>
  <div class="container">
    <div
      class="btn"
      on:click={e => {
        from.set({ lon: '4.6615428', lat: '52.1277023' });
      }}>
      aaaa
    </div>
    <Alerts />
    <Journeys />
  </div>
</main>
