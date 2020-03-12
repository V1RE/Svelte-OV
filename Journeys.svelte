<script>
  import Journey from "./Journey.svelte";
  import { from, to, journeys, online } from "./stores.js";
  import Mdicon from "mdi-svelte";
  import {
    mdiChevronRight,
    mdiMenuDown,
    mdiWifiStrengthOffOutline
  } from "@mdi/js";
</script>

<style>
  .loading {
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #fafafa 8%, #f4f4f4 38%, #fafafa 54%);
    background-size: 1000px 640px;
    color: transparent !important;
  }

  .sections {
    height: 1.5rem;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
</style>

{#if $journeys.length}
  {#each $journeys as journey}
    <Journey {journey} />
  {/each}
{:else}
  {#if $online}
    <style>
      body {
        height: 100vh;
        overflow: hidden;
      }
    </style>
    <div class="card col-12 mb-3">
      <div class="card-body">
        <div class="cardtitles">
          <h5 class="card-title loading">Loading...</h5>
          <h6 class="card-subtitle mb-2 text-muted loading">Loading...</h6>
        </div>
        <div class="sections loading" />
      </div>
    </div>
    <div class="card col-12 mb-3">
      <div class="card-body">
        <div class="cardtitles">
          <h5 class="card-title loading">Loading...</h5>
          <h6 class="card-subtitle mb-2 text-muted loading">Loading...</h6>
        </div>
        <div class="sections loading" />
      </div>
    </div>
    <div class="card col-12 mb-3">
      <div class="card-body">
        <div class="cardtitles">
          <h5 class="card-title loading">Loading...</h5>
          <h6 class="card-subtitle mb-2 text-muted loading">Loading...</h6>
        </div>
        <div class="sections loading" />
      </div>
    </div>
    <div class="card col-12 mb-3">
      <div class="card-body">
        <div class="cardtitles">
          <h5 class="card-title loading">Loading...</h5>
          <h6 class="card-subtitle mb-2 text-muted loading">Loading...</h6>
        </div>
        <div class="sections loading" />
      </div>
    </div>
    <div class="card col-12 mb-3">
      <div class="card-body">
        <div class="cardtitles">
          <h5 class="card-title loading">Loading...</h5>
          <h6 class="card-subtitle mb-2 text-muted loading">Loading...</h6>
        </div>
        <div class="sections loading" />
      </div>
    </div>
    <div class="card col-12 mb-3">
      <div class="card-body">
        <div class="cardtitles">
          <h5 class="card-title loading">Loading...</h5>
          <h6 class="card-subtitle mb-2 text-muted loading">Loading...</h6>
        </div>
        <div class="sections loading" />
      </div>
    </div>
  {:else}
    <Mdicon path={mdiWifiStrengthOffOutline} />
  {/if}
{/if}
