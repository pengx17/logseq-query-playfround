<script lang="ts">
  import Repl from "./Repl.svelte";

  let inner: Element;

  const clickOutside = (e: Event) => {
    if (!inner.contains(e.target as any)) {
      window.logseq.hideMainUI();
    }
  };
</script>

<main on:click={clickOutside}>
  <div bind:this={inner} class="inner"><Repl /></div>
</main>

<style>
  main {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: fixed;
    padding: 8em;
    backdrop-filter: saturate(0.8) blur(10px);
  }

  .inner {
    border: 3px solid #000;
    background: #eee;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
  }

  .inner:focus-within {
    box-shadow: 0 0 20px #888;
  }
</style>
