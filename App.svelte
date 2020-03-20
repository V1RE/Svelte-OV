<script>
  import Navbar from "./Navbar.svelte";
  import Alerts from "./Alerts.svelte";
  import Journeys from "./Journeys.svelte";
  import Settings from "./Settings.svelte";
  import Toast from "./Toast.svelte";
  import Places from "./Places.svelte";
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
    <Places />
    <Settings />
    <Alerts />
    <Journeys />
    <Toast />
  </div>
</main>
