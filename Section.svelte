<script>
  import Icon from "./Icon.svelte";
  import Mdicon from "mdi-svelte";
  import { mdiChevronRight } from "@mdi/js";

  export let section;
  export let i;
  export let open;
  let type = "" + (section.mode || section.type);
  let baseUrl = "https://www.google.com/maps/dir/?api=1&travelmode=walking";
  let url;

  if (type == "walking" || type == "transfer") {
    try {
      let from = section.from.address || section.from.stop_point;
      let to = section.to.address || section.to.stop_point;

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
    } catch (error) {
      console.log(error);
    }
  }

  if (type == "public_transport") {
    type = section.display_informations.physical_mode;
  }
</script>

{#if type != "waiting" || open}
  {#if i}
    <span class="text-black-50">
      <Mdicon path={mdiChevronRight} size="1rem" />
    </span>
  {/if}
  {#if url && open}
    <a href={url} class="card-link" target="_blank"><Icon {type}/></a>
  {:else}
    <span class="card-link"><Icon {type}/></span>
  {/if}
{/if}