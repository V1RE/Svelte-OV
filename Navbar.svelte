<script>
  import {
    mdiHistory,
    mdiArrowRightCircleOutline,
    mdiArrowLeftCircleOutline
  } from "@mdi/js";
  import Mdicon from "mdi-svelte";
  import { journeys, online } from "./stores.js";

  export let getJourneys;
</script>

<style>
  .disabled {
    pointer-events: none;
  }
</style>

<nav class="navbar navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="/logo.svg" width="45" height="45" alt="" />
    </a>
    <div class="btn-group">
      <div
        class="btn btn-primary"
        class:disabled={!$online}
        on:click={e => {
          getJourneys($journeys[0].links[1].href, 0, true);
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
        class:disabled={!$online}
        on:click={e => {
          getJourneys($journeys[$journeys.length - 1].links[0].href, 0);
        }}>
        <Mdicon path={mdiArrowRightCircleOutline} />
      </div>
    </div>
  </div>
</nav>
