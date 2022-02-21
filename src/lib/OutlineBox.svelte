<script type="ts">
  export let extraClasses: string = '';
</script>

<div
  class={'outline outline-gray-500 rounded-xl flex justify-center items-center ' +
    extraClasses}
>
  <slot />
</div>
