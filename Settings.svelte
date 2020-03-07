<script>
  import Mdicon from "mdi-svelte";
  import { mdiCrosshairsGps } from "@mdi/js";
  import { from, to } from "./stores.js";
  import { onMount } from "svelte";

  let geo = true;

  function setGeo() {
    console.log("setgeo");
    if (navigator.geolocation) {
      console.log("door de if");
      navigator.geolocation.getCurrentPosition(val => {
        from.set({
          lat: val.coords.latitude,
          lon: val.coords.longitude
        });
      });
    } else {
      geo = false;
    }
  }
</script>

<style>
  .input-group-text {
    cursor: pointer;
  }
</style>

<div class="input-group mb-3">
  <input
    type="text"
    class="form-control"
    placeholder="Username"
    aria-label="Username"
    aria-describedby="basic-addon1" />
  <div class="input-group-append">
    {#if geo}
      <span
        class="input-group-text"
        id="basic-addon1"
        on:click={e => {
          setGeo();
        }}>
        <Mdicon path={mdiCrosshairsGps} />
      </span>
    {/if}
  </div>
</div>
