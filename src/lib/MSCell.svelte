<script type="ts">
  import type {
    MSCellLocation,
    MSCellSurroundingLocations,
    MSCellSurroundings,
    MSGameState,
  } from 'src/types/MS.type';
  import { createEventDispatcher } from 'svelte';

  export let bomb: boolean;
  export let location: MSCellLocation;
  export let surroundings: MSCellSurroundings;
  export let gameState: MSGameState;
  $: locationStr = `${location.row}:${location.col}`;

  let clicked = false;
  let flagged = false;

  const dispatch = createEventDispatcher();

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

  const handleCellClick = (event) => {
    if (gameState === 'playing' && !flagged) {
      dispatch('cell-click', { location: locationStr });
      clicked = true;
    }
  };
  const handleCellRightClick = () => {
    if (gameState === 'playing') {
      flagged = !flagged;
    }
  };

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
  data-location={locationStr}
  class={`${
    clicked
      ? 'bg-gray-200'
      : `bg-gray-700 ${
          gameState === 'playing' ? 'cursor-pointer' : 'cursor-not-allowed'
        }`
  } h-10 w-10 flex justify-center items-center`}
  on:click={handleCellClick}
  on:contextmenu|preventDefault={handleCellRightClick}
>
  {#if gameState === 'playing'}
    {#if clicked}
      {#if bomb}
        <span >💣</span>
      {:else if numSurroundingBombs > 0}
        <span>{numSurroundingBombs}</span>
      {/if}
    {:else if flagged}
      <span>🚩</span>
    {/if}
  {:else if bomb}
    <span class={clicked && 'bg-red-500'}>💣</span>
  {:else if flagged}
    <span>🚩</span>
  {/if}
</div>
