import "@logseq/libs";

import App from "./App.svelte";

function createModel() {
  return {
    openQueryPlayground() {
      logseq.showMainUI();
    },
  };
}

function main() {
  new App({
    target: document.querySelector("#app"),
    props: {
      name: "world",
    },
  });

  logseq.setMainUIInlineStyle({
    position: "fixed",
    zIndex: "11",
    background: "#eee",
  });

  const key = logseq.baseInfo.id;

  logseq.provideStyle(`
  div[data-injected-ui=open-query-playground-${key}] {
    display: inline-flex;
    align-items: center;
    opacity: .55;
    font-weight: 500;
    padding: 0 5px;
    position: relative;
    font-size: 1.2em;
  }
  
  div[data-injected-ui=open-query-playground-${key}]:hover {
    opacity: .9;
  }
`);

  logseq.provideUI({
    key: "open-query-playground",
    path: "#search",
    template: `
      <a data-on-click="openQueryPlayground" style="opacity: .6; display: inline-flex; padding-left: 3px;">
        🗄
      </a>
    `,
  });
}

logseq.ready(createModel()).then(main).catch(console.error);
