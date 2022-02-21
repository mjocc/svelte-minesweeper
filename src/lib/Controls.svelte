<script type="ts">
  import Button from './Button.svelte';
  import OutlineBox from './OutlineBox.svelte';

  export let bombFrequency: number;
  export let reset: boolean;

  let bombFrequencySliderValue: number = 0.15;
  $: sliderChanged = bombFrequency !== bombFrequencySliderValue;
</script>

<div class="flex justify-center items-center my-6">
  <OutlineBox extraClasses="py-3 px-5">
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
  </OutlineBox>
</div>
