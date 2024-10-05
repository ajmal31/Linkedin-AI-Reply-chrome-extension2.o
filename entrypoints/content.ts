import ReactDOM from "react-dom/client";
import ImageButton from "./components/ImageBtn";
import React from "react";
import { watchDomChanges } from "./utils/domWatcher";
import "./index.css"

export default defineContentScript({
  matches: ["https://www.linkedin.com/*"],

  main(ctx) {
    let anchor:any
    const ui = createIntegratedUi(ctx, {
      position: "inline",
      anchor:()=>anchor,
      append:(anchor,root)=> anchor.insertAdjacentElement("afterend", root),
      onMount: async(container) => {
          let messageBox =document.querySelector(".msg-form__contenteditable");
          if (!messageBox) return;

          // Find the parent container 
          const parentContainer = messageBox.closest(".flex-grow-1.relative");
          if (!parentContainer) return;

          // Create a new div for the image button
          const imgContainer = document.createElement("div");
          imgContainer.style.position = "absolute";
          imgContainer.style.bottom = "0px";
          imgContainer.style.right = "0px";
          imgContainer.style.zIndex = "10";
          imgContainer.style.width = "50px"; 
          imgContainer.style.height = "50px";
          parentContainer?.appendChild(imgContainer);

          const root = ReactDOM.createRoot(imgContainer);
          root.render(React.createElement(ImageButton as typeof ImageButton));
          return root
      },
      onRemove: (root) => {
        // root?.unmount();
      },
    });
    watchDomChanges(ctx, '[class^="msg-form__contenteditable"]', {
      onAdd: (newAnchor:any) => {
        anchor = newAnchor;
        ui.mount();
      },
      onRemove: () => {
        ui.remove();
      },
    });
  },
});





