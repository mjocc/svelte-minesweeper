<script type="ts">
  import type {
    MSCellGameOverEvent,
    MSCellLocation,
    MSCellRevealSurroundingsEvent,
    MSCellSurroundingLocations,
    MSCellSurroundings,
  } from 'src/types/MS.type';
  import MSCell from './MSCell.svelte';

  export let bombFrequency: number; // number from 0 to 1

  $: getBombOrEmpty = () => Math.random() < bombFrequency;
  $: getBombLocationsRow = () =>
    Array.from(Array(10), () => getBombOrEmpty());
  $: bombLocations = Array.from(Array(10), () => getBombLocationsRow());

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

  const handleGameOver = ({ detail }: MSCellGameOverEvent) => {
    console.log(`game over at ${detail.row}, ${detail.col}`);
  };
</script>

<div class="grid grid-cols-10 gap-2 max-w-lg mx-auto mt-7">
  {#each bombLocations as bombLocationsRow, row (row)}
    {#each bombLocationsRow as bomb, col (`${row}:${col}`)}
      <MSCell
        {bomb}
        location={{ row, col }}
        surroundings={getSurroundings({ row, col })}
        on:reveal-surroundings={revealSurroundings}
        on:game-over={handleGameOver}
      />
    {/each}
  {/each}
</div>
