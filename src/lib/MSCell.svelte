<script type="ts">
  import { createEventDispatcher } from "svelte";

  export let bomb: boolean;
  export let row: number;
  export let col: number;

  let clicked = false;

  const dispatch = createEventDispatcher();
  $: {
    if (clicked && bomb) {
      dispatch("game-over", {
        row,
        col,
      });
    }
  }
</script>

<div
  class={`${clicked ? "bg-gray-200" : "bg-gray-700 cursor-pointer"} h-10 w-10`}
  on:click|once={() => {
    clicked = true;
  }}
>
  {bomb && clicked ? "*" : ""}
</div>
