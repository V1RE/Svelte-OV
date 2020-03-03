<script>
  import Mdicon from "mdi-svelte";
  import {
    mdiWalk,
    mdiHelpBox,
    mdiBus,
    mdiTransitTransfer,
    mdiClockOutline,
    mdiTrain
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
  }
</script>

<Mdicon {path} />
