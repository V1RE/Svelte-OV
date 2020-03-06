<script>
  import { online, journeys } from "./stores";
  import { getJourneys } from "./functions.js";
  import { fly } from "svelte/transition";

  let showOffline = false;

  online.subscribe(val => {
    if (val) {
      getJourneys();
    }

    showOffline = !val;
  });
</script>

{#if showOffline && $journeys.length}
  <div
    class="alert alert-danger"
    role="alert"
    in:fly={{ x: -50, duration: 300 }}
    out:fly={{ x: 50, duration: 300 }}>
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
    <div
      class="alert alert-danger"
      role="alert"
      in:fly={{ x: -50, duration: 300 }}
      out:fly={{ x: 50, duration: 300 }}>
      No internet connection or cached data available...
    </div>
  {/if}
{/if}
