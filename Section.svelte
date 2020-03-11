<script>
  import Icon from "./Icon.svelte";
  import Mdicon from "mdi-svelte";
  import { mdiChevronRight, mdiGoogleMaps } from "@mdi/js";
  import moment from "moment";

  export let section;
  export let i;
  export let open;
  export let length;
  let type = "" + (section.mode || section.type);
  let baseUrl = "https://www.google.com/maps/dir/?api=1&travelmode=walking";
  let url, to, from;

  if (section.from && section.to) {
    from = section.from.address || section.from.stop_point;
    to = section.to.address || section.to.stop_point;
  }

  if (type == "walking" || type == "transfer") {
    try {
      url = encodeURI(
        baseUrl +
          "&origin=" +
          from.coord.lat +
          "," +
          from.coord.lon +
          "&destination=" +
          to.coord.lat +
          "," +
          to.coord.lon
      );
    } catch (error) {}
  }

  if (type == "public_transport") {
    type = section.display_informations.physical_mode;
  }
</script>

<style>
  .open-section {
    display: flex;
    margin-bottom: 1rem;
  }

  .icon {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;
  }

  .route {
    margin-left: auto;
    display: flex;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    border-left: 2px solid #007bff;
    padding-left: 0.5rem;
  }
</style>

{#if open}
  <div class="open-section">
    <div class="icon">
      <Icon {type} />
    </div>
    <div class="content">
      <span class="line1 mb-1">
        {moment(section.departure_date_time).format('HH:mm')}
        {#if from}- {from.name}{/if}
      </span>
      <span class="line2">
        {#if section.duration}
          {moment.utc(section.duration * 1000).format('HH:mm')}
        {/if}
        {#if section.display_informations}
          - {section.display_informations.label} - {section.display_informations.direction}
        {/if}
      </span>
      {#if length - 1 == i}
        <span class="line3 mt-1">
          {moment(section.arrival_date_time).format('HH:mm')}
          {#if to}- {to.name}{/if}
        </span>
      {/if}
    </div>
    {#if url}
      <div class="route">
        <a href={url} target="_blank">
          <Mdicon path={mdiGoogleMaps} />
        </a>
      </div>
    {/if}
  </div>
{:else}
  {#if type != 'waiting' && type != 'transfer'}
    {#if i}
      <span class="text-black-50 chevron">
        <Mdicon path={mdiChevronRight} size="1rem" />
      </span>
    {/if}
    <span class="card-link">
      <Icon {type} />
    </span>
  {/if}
{/if}
