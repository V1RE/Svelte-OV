<script>
  import Navbar from "./Navbar.svelte";
  import Alerts from "./Alerts.svelte";
  import Journeys from "./Journeys.svelte";
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

  :global(.container) {
    padding: 0;
  }
</style>

<Navbar {getJourneys} />

<main>
  <div class="container">
    <Alerts />
    <Journeys />
  </div>
</main>
