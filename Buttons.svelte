<script>
  import Mdicon from "mdi-svelte";
  import moment from "moment";
  import {
    shareQuery,
    dateTimeRepresents,
    toastMessage,
    from,
    to
  } from "./stores";
  import { mdiShareVariant } from "@mdi/js";

  export let journey;
  let baseUrl = window.location.origin;
  let time = moment(
    journey.journeys[0][$dateTimeRepresents + "_date_time"]
  ).subtract(2, "minutes");
  if ($dateTimeRepresents == "arrival") {
    time.add(4, "minutes");
  }
  let timeQuery = "&datetime=" + time.toISOString();
  let shareUrl = encodeURI(baseUrl + $shareQuery + timeQuery);

  function share() {
    if (navigator.share) {
      navigator.share({
        title: "Share test!",
        text: $from.name + " ➡️ " + $to.name + ":\n",
        url: shareUrl
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      toastMessage.set("Link copied!");
    }
  }
</script>

<style>
  .buttons {
    display: flex;
    margin-top: 1rem;
    flex-direction: row;
  }

  .buttons > div {
    margin-right: 0.5rem;
  }
</style>

<div class="buttons">
  <div
    class="share"
    on:click={e => {
      share();
    }}>
    <Mdicon path={mdiShareVariant} />
  </div>
</div>
