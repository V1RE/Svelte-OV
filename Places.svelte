<script>
  import { onMount } from "svelte";
  import { from } from "./stores";
  // import * as places from "places.js";

  onMount(() => {
    const options = {
      appId: "plN7IJ2IUIO4",
      apiKey: "71553105a7831c0e368cac91d7bbecb2",
      container: document.querySelector("#address-input")
    };
    const fromPlaces = places(options);

    fromPlaces.on("change", e => {
      console.log(e.suggestion);
      from.set({
        lat: e.suggestion.latlng.lat,
        lon: e.suggestion.latlng.lng,
        name: e.suggestion.name
      });
    });
  });
</script>

<input type="search" id="address-input" placeholder="Where are we going?" />
