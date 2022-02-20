<script lang="ts">
  import MSGrid from "./lib/MSGrid.svelte";
</script>

<main>
  <h1 class="font-bold text-6xl text-center mt-10">Minesweeper</h1>
  <MSGrid bombFrequency={0.5} />
</main>
