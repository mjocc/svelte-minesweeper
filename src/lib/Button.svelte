<script type="ts">
  export let extraClasses: string = '';
  export let disabled: boolean = false;
</script>

<button
  on:click
  class={'text-white bg-blue-700 disabled:bg-gray-600 disabled:hover:bg-gray-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ' +
    extraClasses}
  {disabled}
>
  <slot />
</button>
