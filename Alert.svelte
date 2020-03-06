<script>
  import { online } from "./stores";

  let showOffline = false;

  online.subscribe(val => {
    showOffline = !val;
  });
</script>

{#if showOffline}
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
{/if}
