<script lang="ts">
  import PageTransition from "$lib/page-transition.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div>
  <PageTransition {data}>
    <slot />
  </PageTransition>
</div>

<style lang="scss">
  div {
    height: 100vh;
    width: 100vw;
  }
</style>
