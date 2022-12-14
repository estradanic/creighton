import Parse from "parse";
import { createMemo, createSignal, For, Index, onMount } from 'solid-js';
import { DateTime } from 'luxon';
import byCycle from '../functions/byCycle';
import byDay from '../functions/byDay';
import infoForDay from '../functions/infoForDay';
import { Observation } from '../types/ObservationTypes'


function Chart () {
  const [observations, setObservations] = createSignal<Observation[]>([]);
  const [loading, setLoading] = createSignal<boolean>(true);
  onMount(() => {
    new Parse.Query<Parse.Object<Observation>>("observation").findAll()
      .then((results) => setObservations(results.map((result) => ({ ...result.attributes, id: result.id }))))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  });
  const _byDay = createMemo(() => byDay(observations()));
  const _byCycle = createMemo(() => byCycle(_byDay()));

  return (
    <>
      {
        loading()
          ? <div class='loading' />
          : (
            <div class="chart-container">
              <table>
                <thead>
                  <tr>
                    <Index
                      each={new Array<number>(36).fill(0)}
                      children={(_, index) => (
                        <th>{index + 1}</th>
                      )}
                    />
                  </tr>
                </thead>
                <tbody>
                  <For
                    each={_byCycle()}
                    children={(cycle) => (
                      <tr>
                        <For
                          each={Object.keys(cycle)}
                          children={(day) => {
                            const dayInfo = createMemo(() => infoForDay(observations(), DateTime.fromISO(day)));
                            return (
                              <td>
                                <span>{DateTime.fromISO(day).toFormat("MM/dd")}</span>
                                <br />
                                <span class={`stamp ${dayInfo().stamp}`}>&nbsp;&nbsp;&nbsp;</span>
                                <br />
                                {dayInfo().abbreviation}
                              </td>
                            );
                          }}
                        />
                      </tr>
                    )}
                  />
                </tbody>
              </table>
            </div>
          )
      }
    </>
  );
}

export default Chart;

