<script>
  import Section from "./Section.svelte";
  import moment from "moment";

  export let journey;
  let open = false;

  console.log(journey);
</script>

<div class="card col-12 mb-3" class:open on:click={e=> { open = !open}}>
  <div class="card-body">
    <h5 class="card-title">{journey.journeys[0].sections[0].from.address.administrative_regions[0].name} -> {journey.journeys[0].sections[journey.journeys[0].sections.length - 1].to.address.administrative_regions[0].name}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{moment(journey.journeys[0].departure_date_time).format("HH:mm")} - {moment(journey.journeys[0].arrival_date_time).format("HH:mm")}</h6>
    {#each journey.journeys[0].sections as section, i}
      <Section {section} {i} {open}/>
    {/each}
  </div>
</div>