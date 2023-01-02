import { createMemo, For, JSX } from "solid-js";
import { DateTime } from "luxon";
import ExistingObservation from "../components/ExistingObservation";
import NewObservation from "../components/NewObservation";
import infoForDay from "../functions/infoForDay";
import ObservationsStore from "../stores/ObservationsStore";

function Observations (): JSX.Element {
  const { observations, loading, setObservations } = ObservationsStore();
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
        {todaysInfo().abbreviation}<i>{todaysInfo().times > 0 ? `x${todaysInfo().times}` : ""}</i>
        <span class={`direction ${todaysInfo().direction}`} />
      </h2>
      {
        loading()
          ? <div class='loading' />
          : (
              <>
                <NewObservation />
                <For
                  each={observations()}
                  fallback={<h2>No observations yet.</h2>}
                  children={(observation) => (
                    <ExistingObservation {...observation} />
                  )}
                />
              </>
            )
      }
    </>
  );
}

export default Observations;
