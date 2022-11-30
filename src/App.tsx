import { DateTime } from "luxon";
import { For, createMemo, createSignal, onMount } from "solid-js";
import "./App.css";
import ExistingObservation, {Observation} from "./components/ExistingObservation";
import NewObservation from "./components/NewObservation";


function App() {
  const [observations, setObservations] = createSignal<Observation[]>([]);
  onMount(async () => {
    try {
      const response = await fetch("/observations");
      const json = await response.json();
      setObservations(json);
    } catch (e) {
      console.error(e);
    }
  });
  const nextIndex = createMemo(() => {
    if (observations().length === 0) {
      return "0";
    }
    return `${Math.max(...observations().map((o) => parseInt(o.id))) + 1}`;
  });

  return (
    <>
      <h1>Creighton Observation Tracker</h1>
      <h2>Today's highlight color: <span class={`highlight-color ${DateTime.now().weekdayLong}`}>{DateTime.now().weekdayLong}</span></h2>
      <NewObservation id={nextIndex} />
      <For
        each={observations().sort((a, b) => b.datetime.localeCompare(a.datetime))}
        fallback={<h2>No observations yet.</h2>}
        children={(observation, index) => <ExistingObservation index={index} observations={observations} {...observation} />}
      />
    </>
  );
}

export default App;
