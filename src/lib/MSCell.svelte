<script type="ts">
  import type {
    MSCellLocation,
    MSCellSurroundingLocations,
    MSCellSurroundings,
  } from 'src/types/MS.type';
  import { createEventDispatcher } from 'svelte';

  export let bomb: boolean;
  export let location: MSCellLocation;
  export let surroundings: MSCellSurroundings;

  let clicked = false;
  let flagged = false;

  $: numSurroundingBombs = Object.values(surroundings).filter(
    (value) => value
  ).length;
  $: surroundingEmptyCells = Object.keys(
    Object.fromEntries(
      Object.entries(surroundings).filter(
        (location) => location[1] !== undefined && !location[1]
      )
    )
  ) as MSCellSurroundingLocations[];

  const handleCellClick = () => {
    if (!flagged) {
      clicked = true;
    }
  };
  const handleCellRightClick = () => {
    flagged = !flagged;
  };

  const dispatch = createEventDispatcher();
  $: {
    if (clicked && numSurroundingBombs === 0) {
      dispatch('reveal-surroundings', { location, surroundingEmptyCells });
    }
  }
  $: {
    if (clicked && bomb) {
      dispatch('game-over', location);
    }
  }
</script>

<div
  data-mscell={true}
  data-location={`${location.row}:${location.col}`}
  class={`${
    clicked ? 'bg-gray-200' : 'bg-gray-700 cursor-pointer'
  } h-10 w-10 flex justify-center items-center`}
  on:click={handleCellClick}
  on:contextmenu|preventDefault={handleCellRightClick}
>
  {#if clicked}
    {#if bomb}
      <span>💣</span>
    {:else if numSurroundingBombs > 0}
      <span>{numSurroundingBombs}</span>
    {/if}
  {:else if flagged}
    <span>🚩</span>
  {/if}
</div>
