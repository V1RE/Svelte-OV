<script>
  import Navbar from "./Navbar.svelte";
  import Alerts from "./Alerts.svelte";
  import Journeys from "./Journeys.svelte";
  import Settings from "./Settings.svelte";
  import { getJourneys } from "./functions.js";
  import { from, to, dateTime, dateTimeRepresents } from "./stores.js";

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  from.subscribe(e => {
    if (e) {
      getJourneys();
    }
  });

  to.subscribe(e => {
    if (e) {
      getJourneys();
    }
  });

  dateTime.subscribe(e => {
    if (e) {
      getJourneys();
    }
  });

  dateTimeRepresents.subscribe(e => {
    if (e) {
      getJourneys();
    }
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
    <Settings />
    <Alerts />
    <Journeys />
  </div>
</main>
