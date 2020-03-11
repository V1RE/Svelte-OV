<script>
  import { toastMessage } from "./stores";
  import { fade } from "svelte/transition";
</script>

<style>
  .toastMessage {
    position: fixed;
    bottom: 20%;
    right: 50vw;
    transform: translate(50%, 50%);
    padding: 0.5rem 1rem;
    border-radius: 1000px;
    pointer-events: none;
  }
</style>

{#if $toastMessage}
  <span class="toastMessage bg-primary text-white" transition:fade>
    {$toastMessage}
  </span>
{/if}
