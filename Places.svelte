<script>
  import { onMount } from "svelte";
  import { from, to } from "./stores";

  const options = {
    appId: "plN7IJ2IUIO4",
    apiKey: "71553105a7831c0e368cac91d7bbecb2"
  };

  onMount(() => {
    const fromPlaces = places({
      ...options,
      container: document.querySelector("#fromInput")
    });

    const toPlaces = places({
      ...options,
      container: document.querySelector("#toInput")
    });

    fromPlaces.on("change", e => {
      from.set({
        lat: e.suggestion.latlng.lat,
        lon: e.suggestion.latlng.lng,
        name: e.suggestion.value
      });
    });

    toPlaces.on("change", e => {
      to.set({
        lat: e.suggestion.latlng.lat,
        lon: e.suggestion.latlng.lng,
        name: e.suggestion.value
      });
    });
  });
</script>

<div class="mb-3">
  <input
    type="search"
    id="fromInput"
    placeholder="From"
    value={$from.name || ''} />
</div>

<div class="mb-3">
  <input type="search" id="toInput" placeholder="To" value={$to.name || ''} />
</div>
