<script type="ts">
  import MSCell from './MSCell.svelte';

  export let bombFrequency: number; // number from 0 to 1

  const getBombOrEmpty = () => Math.random() < bombFrequency;
  const getBombLocationsRow = () =>
    Array.from(Array(10), () => getBombOrEmpty());
  const bombLocations = Array.from(Array(10), () => getBombLocationsRow());

  const handleGameOver = (info: CustomEvent<any>) => {
    alert(`game over at ${info.detail.row}, ${info.detail.col}`);
  };
</script>

<div class="grid grid-cols-10 gap-2 max-w-lg mx-auto mt-7">
  {#each bombLocations as bombLocationsRow, row (row)}
    {#each bombLocationsRow as bomb, col (`${row}:${col}`)}
      <MSCell {bomb} {row} {col} on:game-over={handleGameOver} />
    {/each}
  {/each}
</div>
