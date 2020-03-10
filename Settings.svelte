<script>
  import Mdicon from "mdi-svelte";
  import { mdiCrosshairsGps } from "@mdi/js";
  import { from, to } from "./stores.js";
  import { onMount } from "svelte";

  let geo = true;
  let results = {};
  let fromQuery = $from.name;
  let toQuery = $to.name;
  let skip = true;
  let fromFirst = true;
  let resp;
  let runs = 0;

  function setGeo(target) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(val => {
        target.set({
          lat: val.coords.latitude,
          lon: val.coords.longitude,
          name: "Current location"
        });
      });
      skip = true;
      if (target === from) {
        fromQuery = "Current location";
      } else {
        toQuery = "Current location";
      }
    } else {
      geo = false;
    }
  }

  async function geocoding(query) {
    if (runs > 1) {
      if (!skip) {
        resp = await fetch(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            query +
            ".json?country=nl&access_token=pk.eyJ1IjoidjFyZSIsImEiOiJjazdoa2ozNXIwYWN6M2ZwOHpxNzVzODJnIn0.Vqg4dw-ByJC0JFGUOm8GXw"
        );
        results = await resp.json();
        console.log(results);
      } else {
        skip = false;
      }
    } else {
      runs++;
    }
  }

  function setLocation(result) {
    if (fromFirst) {
      from.set({
        lat: result.center[1],
        lon: result.center[0],
        name: result.place_name
      });
      skip = true;
      fromQuery = result.place_name;
    } else {
      to.set({
        lat: result.center[1],
        lon: result.center[0],
        name: result.place_name
      });
      skip = true;
      toQuery = result.place_name;
    }
    results = {};
  }

  $: fromQuery && geocoding(fromQuery) && (fromFirst = true);
  $: toQuery && geocoding(toQuery) && (fromFirst = false);

  onMount(() => {
    results = {};
    skip = false;
  });
</script>

<style>
  span {
    cursor: pointer;
  }
</style>

<form
  class="input-group mb-3"
  on:submit|preventDefault={e => {
    if (Object.keys(results).length) {
      from.set({
        lat: results.features[0].center[1],
        lon: results.features[0].center[0],
        name: results.features[0].place_name
      });
      skip = true;
      fromQuery = results.features[0].place_name;
      results = {};
    }
  }}>
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
</form>

<form
  class="input-group mb-3"
  on:submit|preventDefault={e => {
    if (Object.keys(results).length) {
      to.set({
        lat: results.features[0].center[1],
        lon: results.features[0].center[0],
        name: results.features[0].place_name
      });
      skip = true;
      toQuery = results.features[0].place_name;
      results = {};
    }
  }}>
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
</form>

{#if Object.keys(results).length}
  <div class="list-group mb-3">
    {#each results.features as result}
      <span
        class="list-group-item list-group-item-action"
        tabindex="0"
        on:keyup={e => {
          if (e.key === 'Enter') {
            setLocation(result);
          }
        }}
        on:click={e => {
          setLocation(result);
        }}>
        {result.place_name}
      </span>
    {/each}
  </div>
{/if}
