<script>
  import Mdicon from "mdi-svelte";
  import { mdiCrosshairsGps, mdiHistory } from "@mdi/js";
  import { from, to, dateTime, dateTimeRepresents } from "./stores.js";
  import { onMount } from "svelte";
  import moment from "moment";

  let geo = true;
  let results = {};
  let fromQuery = $from.name;
  let toQuery = $to.name;
  let skip = true;
  let fromFirst = true;
  let resp;
  let runs = 0;
  let time = moment($dateTime).format("HH:mm");
  let departure = $dateTimeRepresents;

  function setGeo(target) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(val => {
        target.set({
          lat: val.coords.latitude,
          lon: val.coords.longitude
        });
        lookup();
      });
      skip = true;
    } else {
      geo = false;
    }
  }

  async function geocoding(query) {
    if (runs > 1) {
      if (!skip) {
        resp = await fetch(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            encodeURI(query) +
            ".json?country=nl&access_token=pk.eyJ1IjoidjFyZSIsImEiOiJjazdoa2ozNXIwYWN6M2ZwOHpxNzVzODJnIn0.Vqg4dw-ByJC0JFGUOm8GXw"
        );
        if (await resp.ok) {
          results = await resp.json();
        } else {
          results = {};
        }
        console.log(resp);
      } else {
        skip = false;
      }
    } else {
      runs++;
    }
  }

  async function lookup() {
    if (!$from.name) {
      const resp = await fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          $from.lon +
          "," +
          $from.lat +
          ".json?country=nl&access_token=pk.eyJ1IjoidjFyZSIsImEiOiJjazdoa2ozNXIwYWN6M2ZwOHpxNzVzODJnIn0.Vqg4dw-ByJC0JFGUOm8GXw"
      );
      if (await resp.ok) {
        let places = await resp.json();
        from.update(e => {
          e.name = places.features[0].place_name;
          fromQuery = e.name;
          return e;
        });
      }
    }

    if (!$to.name) {
      const resp = await fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          $to.lon +
          "," +
          $to.lat +
          ".json?country=nl&access_token=pk.eyJ1IjoidjFyZSIsImEiOiJjazdoa2ozNXIwYWN6M2ZwOHpxNzVzODJnIn0.Vqg4dw-ByJC0JFGUOm8GXw"
      );
      if (await resp.ok) {
        let places = await resp.json();
        to.update(e => {
          e.name = places.features[0].place_name;
          toQuery = e.name;
          return e;
        });
      }
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
  $: time &&
    dateTime.set(
      moment(
        moment().format("YYYY MM DD ") + time,
        "YYYY MM DD HH:mm"
      ).toISOString()
    );
  $: departure && dateTimeRepresents.set(departure);

  onMount(() => {
    results = {};
    skip = false;
    lookup();
  });
</script>

<style>
  span {
    cursor: pointer;
  }

  input {
    text-overflow: ellipsis;
  }
</style>

<div class="input-group mb-3">
  <div class="custom-control custom-radio custom-control-inline">
    <input
      type="radio"
      id="customRadioInline1"
      name="customRadioInline1"
      bind:group={departure}
      value="departure"
      class="custom-control-input" />
    <label class="custom-control-label" for="customRadioInline1">
      Depart at:
    </label>
  </div>
  <div class="custom-control custom-radio custom-control-inline">
    <input
      type="radio"
      id="customRadioInline2"
      name="customRadioInline1"
      bind:group={departure}
      value="arrival"
      class="custom-control-input" />
    <label class="custom-control-label" for="customRadioInline2">
      Arrive by:
    </label>
  </div>
</div>

<form class="input-group mb-3">
  <input
    type="time"
    class="form-control"
    placeholder="From"
    aria-label="From"
    aria-describedby="basic-addon1"
    bind:value={time} />
  <div class="input-group-append">
    <span
      class="input-group-text"
      id="basic-addon1"
      on:click={e => {
        time = moment().format('HH:mm');
      }}>
      <Mdicon path={mdiHistory} />
    </span>
  </div>
</form>

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
    on:focus={e => {
      e.target.select();
    }}
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
    on:focus={e => {
      e.target.select();
    }}
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
