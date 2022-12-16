import { createMemo, For, Index, JSX } from "solid-js";
import { DateTime } from "luxon";
import byCycle, { MAX_CYCLE_LENGTH } from "../functions/byCycle";
import byDay from "../functions/byDay";
import infoForDay from "../functions/infoForDay";
import observationsStore from "../stores/observations";

function Chart (): JSX.Element {
  const { observations, loading } = observationsStore();
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
                        each={new Array<number>(MAX_CYCLE_LENGTH).fill(0)}
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
                                  {!dayInfo().abbreviation.includes(" ") && <br />}
                                  {dayInfo().abbreviation}
                                  <br />
                                  <i>{dayInfo().times > 0 ? `x${dayInfo().times}` : <br />}</i>
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
