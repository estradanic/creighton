import { createSignal, onMount, createMemo, For } from "solid-js";
import { DateTime } from "luxon";
import ExistingObservation from "../components/ExistingObservation";
import NewObservation from "../components/NewObservation";
import infoForDay from "../functions/infoForDay";
import Parse from "parse";
import { Observation } from '../types/ObservationTypes';

function Observations() {
  const [observations, setObservations] = createSignal<Observation[]>([]);
  const [loading, setLoading] = createSignal<boolean>(true);
  onMount(async () => {
    try {
      const results = await new Parse.Query<Parse.Object<Observation>>("observation").findAll();
      setObservations(results.map((result) => ({...result.attributes, id: result.id})));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  });
  const todaysInfo = createMemo(() => infoForDay(observations(), DateTime.now()));
  return (
    <>
      <h2>
        Today is&nbsp;
        <span class={`highlight-color ${DateTime.now().weekdayLong}`}>
          {DateTime.now().weekdayLong}
        </span>
        &nbsp;{DateTime.now().toFormat("MMMM d, yyyy")}
      </h2>
      <h2>
        Cycle Day: {todaysInfo().cycleDay}
      </h2>
      <h2>
        <span class={`stamp ${todaysInfo().stamp}`}>&nbsp;&nbsp;&nbsp;</span>
        {todaysInfo().abbreviation}
      </h2>
      {loading() && <h2>Loading...</h2>}
      <NewObservation observations={observations} loading={loading} />
      <For
        each={observations().sort((a, b) => b.datetime.localeCompare(a.datetime))}
        fallback={<h2>No observations yet.</h2>}
        children={(observation) => <ExistingObservation observations={observations} {...observation} />}
      />
    </>
  );
}

export default Observations;
