<script>
  import Navbar from "./Navbar.svelte";
  import Alerts from "./Alerts.svelte";
  import Journeys from "./Journeys.svelte";
  import Settings from "./Settings.svelte";
  import { getJourneys, subscribe } from "./functions.js";

  subscribe();
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
    <Settings />
    <Alerts />
    <Journeys />
  </div>
</main>
