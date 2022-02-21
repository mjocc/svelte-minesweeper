<script lang="ts">
  import Controls from './lib/Controls.svelte';
  import MSGrid from './lib/MSGrid.svelte';
  import type { MSGameState } from './types/MS.type';

  let bombFrequency: number = 0.15;

  let gameState: MSGameState = 'playing';
  $: gameColors = {
    playing: '#FFFFFF',
    won: '#90EE90',
    lost: '#FF7376',
  };

  let reset: boolean = false;
  $: {
    reset;
    bombFrequency;
    gameState = 'playing';
  }
</script>

<main style="--bg-color: {gameColors[gameState]}">
  <h1 class="font-bold text-6xl text-center pt-10">Minesweeper</h1>
  {#key `${bombFrequency}:${reset}`}
    <MSGrid
      {bombFrequency}
      disabled={gameState !== 'playing'}
      on:game-over={() => {
        gameState = 'lost';
      }}
      on:win-game={() => {
        gameState = 'won';
      }}
    />
  {/key}
  <Controls bind:bombFrequency bind:reset />
</main>

<style>
  main {
    height: 100vh;
    width: 100vw;
    background-color: var(--bg-color);
  }
</style>
