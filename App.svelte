<script>
  import Navbar from "./Navbar.svelte";
  import Alerts from "./Alerts.svelte";
  import Journeys from "./Journeys.svelte";
  import Settings from "./Settings.svelte";
  import { getJourneys } from "./functions.js";
  import { from } from "./stores.js";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  from.subscribe(e => {
    console.log(e);
    getJourneys();
  });

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

<Navbar />

<main>
  <div class="container">
    <div
      class="btn"
      on:click={e => {
        from.set({ lon: '4.6615428', lat: '52.1277023' });
      }}>
      aaaa
    </div>
    <Settings />
    <Alerts />
    <Journeys />
  </div>
</main>
