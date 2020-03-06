<script>
  import { fly } from "svelte/transition";

  export let color = "danger";
</script>

<div
  class="alert alert-{color}"
  role="alert"
  in:fly={{ x: -50, duration: 300 }}>
  <slot />
</div>
