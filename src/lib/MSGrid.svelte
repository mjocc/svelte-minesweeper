<script type="ts">
  import type {
    MSCellClickEvent,
    MSCellLocation,
    MSCellRevealSurroundingsEvent,
    MSCellSurroundingLocations,
    MSCellSurroundings,
    MSGameOverEvent,
    MSGameState,
  } from 'src/types/MS.type';
  import { createEventDispatcher } from 'svelte';
  import MSCell from './MSCell.svelte';
  import OutlineBox from './OutlineBox.svelte';

  export let bombFrequency: number; // number from 0 to 1
  export let gameState: MSGameState;
  const dispatch = createEventDispatcher();

  $: getBombOrEmpty = () => Math.random() < bombFrequency;
  $: getBombLocationsRow = () => Array.from(Array(10), () => getBombOrEmpty());
  $: bombLocations = Array.from(Array(10), () => getBombLocationsRow());
  $: getNumBombs = () => {
    let count = 0;
    for (const bombRow of bombLocations) {
      for (const bomb of bombRow) {
        if (bomb) {
          count += 1;
        }
      }
    }
    return count;
  };
  $: numBombs = getNumBombs();

  let clickedCount = 0;
  let recordedLocations = [];
  const recordCellClick = ({ detail: { location } }: MSCellClickEvent) => {
    if (!recordedLocations.includes(location)) {
      recordedLocations.push(location);
      clickedCount += 1;
    }
  };

  const getRelativeLocation = (
    relativeLocationStr: MSCellSurroundingLocations,
    { row, col }: MSCellLocation
  ): MSCellLocation => {
    if (relativeLocationStr.startsWith('t')) {
      row -= 1;
    } else if (relativeLocationStr.startsWith('b')) {
      row += 1;
    }

    if (relativeLocationStr.endsWith('l')) {
      col -= 1;
    } else if (relativeLocationStr.endsWith('r')) {
      col += 1;
    }

    return { row, col };
  };
  const getSurroundings = (location: MSCellLocation): MSCellSurroundings => {
    const relativeLocationStrs: MSCellSurroundingLocations[] = [
      'tl',
      'tm',
      'tr',
      'ml',
      'mr',
      'bl',
      'bm',
      'br',
    ];
    const surroundings = {};
    for (const rls of relativeLocationStrs) {
      const { row, col } = getRelativeLocation(rls, location);
      surroundings[rls] = bombLocations[row]?.[col];
    }
    return surroundings;
  };

  const revealSurroundings = ({ detail }: MSCellRevealSurroundingsEvent) => {
    for (const emptyCell of detail.surroundingEmptyCells) {
      const { row, col } = getRelativeLocation(emptyCell, detail.location);
      const elem: HTMLDivElement = document.querySelector(
        `div[data-mscell="true"][data-location="${row}:${col}"]`
      );
      elem.click();
    }
  };

  const handleGameOver = ({ detail }: MSGameOverEvent) => {
    gameState = 'lost';
    dispatch('game-over', detail);
  };

  $: {
    setTimeout(() => {
      const squaresLeft = 100 - clickedCount;
      if (gameState !== 'lost' && squaresLeft === numBombs) {
        gameState = 'won';
        dispatch('win-game');
      }
    }, 10);
  }
</script>

<div class="flex my-7 justify-center items-center">
  <OutlineBox extraClasses="p-3">
    <div class="grid grid-cols-10 gap-3">
      {#each bombLocations as bombLocationsRow, row (row)}
        {#each bombLocationsRow as bomb, col (`${row}:${col}`)}
          <MSCell
            {bomb}
            {gameState}
            location={{ row, col }}
            surroundings={getSurroundings({ row, col })}
            on:cell-click={recordCellClick}
            on:reveal-surroundings={revealSurroundings}
            on:game-over={handleGameOver}
          />
        {/each}
      {/each}
    </div>
  </OutlineBox>
</div>
