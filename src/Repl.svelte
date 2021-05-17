<script lang="ts">
  import debounce from "lodash.debounce";
  import { onDestroy } from "svelte";
  import { AceEditor } from "svelte-ace";
  import "brace/mode/clojure";
  import "brace/mode/json";
  import "brace/theme/dracula";
  import "brace/theme/solarized_light";

  import Wrapper from "./EditorWrapper.svelte";

  let query: string = `[:find (pull ?h [*])
            :where
            [?h :block/marker ?marker]
            [(contains? #{"NOW" "DOING"} ?marker)]]`;

  let slowQuery: string;

  const dSlowQuery = debounce(() => {
    slowQuery = query;
  }, 300);

  $: if (query) {
    dSlowQuery();
  }

  async function runQuery() {
    try {
      return await logseq.DB.datascriptQuery(query);
    } catch (e) {
      return [];
    }
  }

  let res = runQuery();

  $: if (slowQuery) {
    res = runQuery();
  }

  onDestroy(() => {
    console.log("destroy");
  });
</script>

<div class="root">
  <Wrapper title="Query">
    <AceEditor
      lang="clojure"
      bind:value={query}
      theme="dracula"
      height="100%"
      width="100%"
    />
  </Wrapper>
  <Wrapper title="Result">
    {#await res}
      <p>...waiting</p>
    {:then result}
      <AceEditor
        options
        value={JSON.stringify(result, null, 2)}
        theme="solarized_light"
        lang="json"
        readonly
      />
    {/await}
  </Wrapper>
</div>

<style>
  .root {
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
