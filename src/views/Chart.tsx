import { createMemo, createSignal, For, Index, JSX } from "solid-js";
import { DateTime } from "luxon";
import byCycle from "../functions/byCycle";
import byDay from "../functions/byDay";
import infoForDay from "../functions/infoForDay";
import observationsStore from "../stores/observations";
import Dialog from '../components/Dialog';
import { Observation } from '../types/ObservationTypes';
import ExistingObservation from '../components/ExistingObservation';

function Chart (): JSX.Element {
  const { observations, loading, setObservations } = observationsStore();
  const [observationsDialogIsOpen, setObservationsDialogIsOpen] = createSignal(false);
  const [printDialogIsOpen, setPrintDialogIsOpen] = createSignal(false);
  const [openObservations, setOpenObservations] = createSignal<Observation[]>([]);
  const _byDay = createMemo(() => byDay(observations()));
  const _byCycle = createMemo(() => byCycle(_byDay()));
  const _maxCycleLength = createMemo(() => Math.max(..._byCycle().map((cycle) => Object.keys(cycle).length)));

  const closePrintDialog = (e): void => {
    setPrintDialogIsOpen(false);
    printChart(e);
  }
  const printChart = (e: Event): void => {
    e.preventDefault();
    const chart = document.querySelector(".chart-container");
    if (chart) {
      const printWindow = window.open("", "Print Chart");
      if (printWindow) {
        printWindow.document.write(chart.innerHTML);
        const stylesheets = document.querySelectorAll("style, link[rel='stylesheet']");
        for (let i = 0; i < stylesheets.length; i++) {
          const stylesheet = stylesheets[i];
          const clone = stylesheet.cloneNode(true);
          printWindow.document.head.appendChild(clone);
        }
        const style = printWindow.document.createElement("style");
        style.innerHTML = "table,th,td { background: white !important; }";
        printWindow.document.head.appendChild(style);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
        window.location.reload();
      }
    }
  };

  const openDialog = (observations: Observation[]): void => {
    setOpenObservations(observations);
    setObservationsDialogIsOpen(true);
  };

  return (
    <>
      <Dialog isOpen={printDialogIsOpen()} onClose={closePrintDialog} closeButtonText="Will do!">
        <p>
          Please ensure background graphics are enabled in your print settings (May be under 'More Settings' or 'Advanced Settings'; May be called 'Print Background').
          <br />
          Also, make sure to select 'Landscape' orientation and 'Fit to Page' scaling.
          <br />
          You may need to enable popups for this site to print successfully.
        </p>
      </Dialog>
      <Dialog isOpen={observationsDialogIsOpen()} onClose={() => setObservationsDialogIsOpen(false)}>
        <For
          each={openObservations()}
          children={(observation) => (
            <ExistingObservation {...observation} observations={observations()} setObservations={setObservations} />
          )}
        />
      </Dialog>
      {
        loading()
          ? <div class='loading' />
          : (
            <>
              <div class="chart-container">
                <table>
                  <thead>
                    <tr>
                      <Index
                        each={new Array<number>(_maxCycleLength()).fill(0)}
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
                              const dayDateTime = DateTime.fromISO(day);
                              const dayInfo = createMemo(() => infoForDay(observations(), dayDateTime));
                              return (
                                <td
                                  onClick={() => openDialog(observations()
                                    .filter((observation) => DateTime.fromISO(observation.datetime).hasSame(dayDateTime, "day"))
                                    .sort((a, b) => a.datetime.localeCompare(b.datetime)))}
                                  class="clickable"
                                >
                                  <span class="chart-element">{DateTime.fromISO(day).toFormat("MM/dd")}</span>
                                  <br />
                                  <span class={`stamp ${dayInfo().stamp} chart-element`}>&nbsp;&nbsp;&nbsp;</span>
                                  <br />
                                  <span class="chart-abbreviation chart-element">{dayInfo().abbreviation}</span>
                                  <br />
                                  <i class="chart-element">{dayInfo().times > 0 ? `x${dayInfo().times}` : <br />}</i>
                                  <span class={`direction ${dayInfo().direction}`} />
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
              <input type="button" value="Print Chart" onClick={() => setPrintDialogIsOpen(true)} />
            </>
          )
      }
    </>
  );
}

export default Chart;
