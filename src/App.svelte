<script lang="ts">
  import Button from './lib/Button.svelte';
  import MSGrid from './lib/MSGrid.svelte';

  let bombFrequency: number = 0.15;
  let bombFrequencySliderValue: number = 0.15;
  $: sliderChanged = bombFrequency !== bombFrequencySliderValue;

  let reset: boolean = false;
</script>

<main>
  <h1 class="font-bold text-6xl text-center mt-10">Minesweeper</h1>
  {#key `${bombFrequency}:${reset}`}
    <MSGrid
      {bombFrequency}
      on:game-over={() => {
        console.log('game over');
      }}
      on:win-game={() => {
        console.log('game won');
      }}
    />
  {/key}
  <div class="flex justify-center items-center my-8">
    <div
      class="py-3 px-5 outline outline-gray-500 rounded-xl flex justify-center items-center"
    >
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <label for="bomb-frequency-slider">Bomb frequency</label>
          {#if sliderChanged}
            <span class="text-gray-500">{bombFrequency.toFixed(2)}</span>
          {/if}
          <span>{bombFrequencySliderValue.toFixed(2)}</span>
        </div>
        <input
          id="bomb-frequency-slider"
          type="range"
          min={0}
          max={1}
          step={0.05}
          bind:value={bombFrequencySliderValue}
        />
        <Button
          extraClasses="mt-2"
          disabled={!sliderChanged}
          on:click={() => {
            bombFrequency = bombFrequencySliderValue;
          }}>Update frequency</Button
        >
      </div>
      <Button
        extraClasses="!ml-7 !mr-0 !mb-0 !py-8"
        on:click={() => {
          reset = !reset;
        }}>Restart game</Button
      >
    </div>
  </div>
</main>
