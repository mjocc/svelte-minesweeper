<script lang="ts">
  import MSGrid from './lib/MSGrid.svelte';
  let bombFrequency: number = 0.15;
  let bombFrequencySliderValue: number = 0.15;
</script>

<main>
  <h1 class="font-bold text-6xl text-center mt-10">Minesweeper</h1>
  {#key bombFrequency}
    <MSGrid {bombFrequency} />
  {/key}
  <div>
    <label for="bomb-frequency-slider">Bomb frequency</label>
    <input
      id="bomb-frequency-slider"
      type="range"
      min={0}
      max={1}
      step={0.05}
      bind:value={bombFrequencySliderValue}
    />
    <span>{bombFrequencySliderValue}</span>
  </div>
  <button
    on:click={() => {
      bombFrequency = bombFrequencySliderValue;
    }}>Update frequency</button
  >
</main>
