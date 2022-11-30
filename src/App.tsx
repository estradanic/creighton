import { For, createMemo, createSignal, onMount } from "solid-js";
import "./App.css";
import ExistingObservation, {ExistingObservationProps} from "./components/ExistingObservation";
import NewObservation from "./components/NewObservation";


function App() {
  const [observations, setObservations] = createSignal<ExistingObservationProps[]>([]);
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
      return 0;
    }
    return Math.max(...observations().map((o) => parseInt(o.id))) + 1;
  });

  return (
    <>
      <h1>Observation Tracker</h1>
      <For
        each={observations().sort((a, b) => a.datetime.localeCompare(b.datetime))}
        fallback={<h2>No observations yet.</h2>}
        children={(observation, index) => <ExistingObservation data-index={index()} {...observation} />}
      />
      <NewObservation id={`${nextIndex()}`} />
    </>
  );
}

export default App;
