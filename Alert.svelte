<script>
  import { online, journeys } from "./stores";
  import { getJourneys } from "./functions.js";

  let showOffline = false;

  online.subscribe(val => {
    if (val) {
      getJourneys();
    }

    showOffline = !val;
  });
</script>

{#if showOffline && $journeys.length}
  <div class="alert alert-danger" role="alert">
    No internet connection available, using cached data...
    <button
      type="button"
      class="close"
      aria-label="Close"
      on:click={e => {
        showOffline = false;
      }}>
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
{:else}
  {#if showOffline}
    <div class="alert alert-danger" role="alert">
      No internet connection or cached data available...
    </div>
  {/if}
{/if}
