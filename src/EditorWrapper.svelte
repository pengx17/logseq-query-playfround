<script lang="ts">
  export let title: string;
</script>

<div class="wrapper">
  <span class="title">{title}</span>
  <div class="content"><slot /></div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-flow: column;
    flex-basis: 50%;
    flex-grow: 0;
    flex-shrink: 0;
    max-width: 50%;
  }

  .title {
    font-size: 18px;
    padding: 4px 8px;
    background: #000;
    color: #fff;
  }

  .content {
    flex: 1;
  }
</style>
