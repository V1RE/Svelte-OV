<svelte:head>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap">
</svelte:head>

<script>
  import Journey from "./Journey.svelte";

  let journeys = [];

  async function getJourneys(
    n = 0,
    url = "https://api.navitia.io/v1/journeys?from=4.9524123%3B52.0444895&to=4.6615428%3B52.1177023"
  ) {
    const res = await fetch(url, {
      headers: {
        Authorization: "bee578e7-45b6-44f4-b317-fd0aad5ae32f"
      }
    });
    const currentJourney = await res.json();

    if (res.ok) {
      journeys = [...journeys, currentJourney];

      if (n < 4) {
        let next = getJourneys(n + 1, currentJourney.links[0].href);
      }
    }
  }

  getJourneys();
</script>

<style>
  main {
    font-family: "Montserrat", sans-serif;
  }
</style>

<main class="p-3">
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>🥖 Radar</h1>
      </div>
    </div>
    <div class="row">
      {#if journeys.length}
        {#each journeys as journey}
          <Journey {journey}/>
        {/each}
      {:else}
        <h2>Duurt ff</h2>
      {/if}
    </div>
  </div>
</main>