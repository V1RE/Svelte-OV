<script>
  import Mdicon from "mdi-svelte";
  import { mdiCrosshairsGps, mdiHistory } from "@mdi/js";
  import { from, to, dateTime, dateTimeRepresents } from "./stores.js";
  import { onMount } from "svelte";
  import moment from "moment";

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

  $: time &&
    dateTime.set(
      moment(
        moment().format("YYYY MM DD ") + time,
        "YYYY MM DD HH:mm"
      ).toISOString()
    );
  $: departure && dateTimeRepresents.set(departure);
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
