<script>
  import { online, journeys } from "./stores";
  import { getJourneys } from "./functions.js";
  import Alert from "./Alert.svelte";

  let showOffline = false;
  let showOnline = false;

  online.subscribe(val => {
    if (val) {
      showOnline = true;
      getJourneys();
      setTimeout(() => {
        showOnline = false;
      }, 5000);
    }

    showOffline = !val;
  });

  showOnline = false;
</script>

{#if showOffline && $journeys.length}
  <Alert>
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
  </Alert>
{:else}
  {#if showOffline}
    <Alert>No internet connection or cached data available...</Alert>
  {/if}
{/if}

{#if showOnline}
  <Alert color="success">
    Internet connection restored
    <button
      type="button"
      class="close"
      aria-label="Close"
      on:click={e => {
        showOnline = false;
      }}>
      <span aria-hidden="true">&times;</span>
    </button>
  </Alert>
{/if}
