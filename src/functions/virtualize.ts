import { Accessor, createSignal } from "solid-js";

function virtualize<T> (
  list: T[],
  interval: number,
  enabled: boolean,
): Accessor<T[]> {
  const [virtualized, setVirtualized] = createSignal<T[]>([]);
  const [virtualizingInterval, setVirtualizingInterval] = createSignal<NodeJS.Timeout>();

  let i = 0;
  setVirtualizingInterval(setInterval(() => {
    if (!enabled) {
      return;
    }
    setVirtualized((prev) => [...prev, list[i]]);
    i++;
    if (i === list.length) {
      clearInterval(virtualizingInterval());
    }
  }, interval));

  return virtualized;
}

export default virtualize;
