<script>
  import Section from "./Section.svelte";
  import Buttons from "./Buttons.svelte";
  import moment from "moment";
  import Mdicon from "mdi-svelte";
  import { fly } from "svelte/transition";
  import {
    mdiChevronRight,
    mdiChevronDown,
    mdiMenuDown,
    mdiMenuUp
  } from "@mdi/js";

  export let journey;
  let open = false;
  let cities = [];

  journey.journeys[0].sections.forEach(section => {
    let cityName;
    try {
      cityName = section.to.address.administrative_regions[0].name;
    } catch (error) {}

    try {
      cityName = section.to.stop_point.administrative_regions[0].name;
    } catch (error) {}

    if (cityName && !cities.includes(cityName)) {
      cities = [...cities, cityName];
    }
  });
</script>

<style>
  .sections {
    display: flex;
  }

  .open .sections {
    flex-direction: column;
  }

  .card-title:first-of-type {
    padding-right: 1.5rem;
  }

  .card-title {
    margin-bottom: 0;
  }

  .card-title:last-of-type {
    margin-bottom: 0.75rem;
  }

  .cardtitles {
    position: relative;
    cursor: pointer;
  }

  .toggle {
    position: absolute;
    right: 0;
    top: 0;
  }

  .card {
    padding: 0;
  }
</style>

<div class="card col-12 mb-3" class:open in:fly={{ x: -50, duration: 300 }}>
  <div class="card-body">
    <div
      class="cardtitles"
      on:click={e => {
        open = !open;
      }}>
      {#if open}
        <div class="cities">
          {#each cities as city, i}
            <h5 class="card-title">{city}</h5>
          {/each}
        </div>
      {:else}
        <h5 class="card-title">
          {journey.journeys[0].sections[0].from.address.administrative_regions[0].name}
          <Mdicon path={mdiChevronRight} />
          {journey.journeys[0].sections[journey.journeys[0].sections.length - 1].to.address.administrative_regions[0].name}
        </h5>
      {/if}
      <div class="toggle">
        {#if open}
          <Mdicon path={mdiMenuUp} />
        {:else}
          <Mdicon path={mdiMenuDown} />
        {/if}
      </div>
      <h6 class="card-subtitle mb-2 text-muted">
        {moment(journey.journeys[0].departure_date_time).format('HH:mm')} - {moment(journey.journeys[0].arrival_date_time).format('HH:mm')}
        ({moment.utc(journey.journeys[0].duration * 1000).format('HH:mm')})
      </h6>
    </div>
    <div class="sections">
      {#each journey.journeys[0].sections as section, i}
        <Section
          {section}
          {i}
          {open}
          length={journey.journeys[0].sections.length} />
      {/each}
    </div>
    {#if open}
      <Buttons {journey} />
    {/if}
  </div>
</div>
