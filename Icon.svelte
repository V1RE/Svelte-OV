<script>
  import Mdicon from "mdi-svelte";
  import {
    mdiWalk,
    mdiHelpBox,
    mdiBus,
    mdiTransitTransfer,
    mdiClockOutline,
    mdiTrain,
    mdiTram,
    mdiSubway
  } from "@mdi/js";

  export let type;
  let path = mdiHelpBox;

  switch (type.toLowerCase()) {
    case "walking":
      path = mdiWalk;
      break;
    case "bus":
      path = mdiBus;
      break;
    case "transfer":
      path = mdiTransitTransfer;
      break;
    case "waiting":
      path = mdiClockOutline;
      break;
    case "train":
      path = mdiTrain;
      break;
    case "tramway":
      path = mdiTram;
      break;
    case "metro":
      path = mdiSubway;
      break;
  }
</script>

<Mdicon {path} />
