// This function will watch dom ( no matter the page refreshed or not)
export function watchDomChanges(ctx: any, selector: any, callbacks: any) {
    let prevAnchor: HTMLElement | undefined;
  
    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el && !prevAnchor) {
        callbacks.onAdd(el);
      } else if (!el && prevAnchor) {
        callbacks.onRemove();
      }
      prevAnchor = el;
    });
    ctx.onInvalidated(() => observer.disconnect());
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
    const initialEl = document.querySelector(selector);
    if (initialEl) {
      callbacks.onAdd(initialEl);
      prevAnchor = initialEl;
    }
  }