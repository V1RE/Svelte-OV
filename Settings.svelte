<script>
  import Mdicon from "mdi-svelte";
  import { mdiCrosshairsGps } from "@mdi/js";
  import { from, to } from "./stores.js";
  import { onMount } from "svelte";

  let geo = true;
  let results = {};
  let fromQuery = "";
  let toQuery = "";
  let skip = false;
  let fromFirst = true;

  function setGeo(target) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(val => {
        target.set({
          lat: val.coords.latitude,
          lon: val.coords.longitude
        });
      });
    } else {
      geo = false;
    }
  }

  async function geocoding(query) {
    if (!skip) {
      const res = await fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          query +
          ".json?country=nl&access_token=pk.eyJ1IjoidjFyZSIsImEiOiJjazdoa2ozNXIwYWN6M2ZwOHpxNzVzODJnIn0.Vqg4dw-ByJC0JFGUOm8GXw"
      );
      results = await res.json();
      console.log(results);
    } else {
      skip = false;
    }
  }

  $: fromQuery && geocoding(fromQuery) && (fromFirst = true);
  $: toQuery && geocoding(toQuery) && (fromFirst = false);
</script>

<style>
  span {
    cursor: pointer;
  }
</style>

<div class="input-group mb-3">
  <input
    type="text"
    class="form-control"
    placeholder="From"
    aria-label="From"
    aria-describedby="basic-addon1"
    bind:value={fromQuery} />
  <div class="input-group-append">
    {#if geo}
      <span
        class="input-group-text"
        id="basic-addon1"
        on:click={e => {
          setGeo(from);
        }}>
        <Mdicon path={mdiCrosshairsGps} />
      </span>
    {/if}
  </div>
</div>

<div class="input-group mb-3">
  <input
    type="text"
    class="form-control"
    placeholder="To"
    aria-label="To"
    aria-describedby="basic-addon1"
    bind:value={toQuery} />
  <div class="input-group-append">
    {#if geo}
      <span
        class="input-group-text"
        id="basic-addon1"
        on:click={e => {
          setGeo(to);
        }}>
        <Mdicon path={mdiCrosshairsGps} />
      </span>
    {/if}
  </div>
</div>

{#if Object.keys(results).length}
  <div class="list-group mb-3">
    {#each results.features as result}
      <span
        class="list-group-item list-group-item-action"
        on:click={e => {
          if (fromFirst) {
            from.set({ lat: result.center[1], lon: result.center[0] });
            skip = true;
            fromQuery = result.text;
          } else {
            to.set({ lat: result.center[1], lon: result.center[0] });
            skip = true;
            toQuery = result.text;
          }
          results = {};
        }}>
        {result.place_name}
      </span>
    {/each}
  </div>
{/if}
