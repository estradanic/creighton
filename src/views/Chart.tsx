import { createMemo, createSignal, For, Index, JSX } from "solid-js";
import { DateTime } from "luxon";
import byCycle from "../functions/byCycle";
import byDay from "../functions/byDay";
import infoForDay from "../functions/infoForDay";
import { observations, loading } from "../stores/ObservationsStore";
import Dialog from "../components/Dialog";
import { Observation } from "../types/ObservationTypes";
import ExistingObservation from "../components/ExistingObservation";
import html2pdf from "../stores/Html2PdfStore";
import { Html2PdfOptions } from "html2pdf.js";
import throwError from "../functions/throwError";

const JS_PDF_OPTIONS = {
  unit: "in",
  format: "letter",
  orientation: "landscape",
} satisfies Html2PdfOptions["jsPDF"];

const HTML_2_CANVAS_OPTIONS = { scale: 2 } satisfies Html2PdfOptions["html2canvas"];

const HTML_2_PDF_OPTIONS = {
  margin: [0.5, 0],
  html2canvas: HTML_2_CANVAS_OPTIONS,
  jsPDF: JS_PDF_OPTIONS,
} satisfies Html2PdfOptions;

function Chart (): JSX.Element {
  const [observationsDialogIsOpen, setObservationsDialogIsOpen] = createSignal(false);
  const [openObservations, setOpenObservations] = createSignal<Observation[]>([]);
  const _byDay = createMemo(() => byDay(observations()));
  const _byCycle = createMemo(() => byCycle(_byDay()));
  const _maxCycleLength = createMemo(() => Math.max(..._byCycle().map((cycle) => Object.keys(cycle).length)));

  const printChart = (e: Event): void => {
    e.preventDefault();
    const chart = document.querySelector(".chart-container");
    if (chart) {
      html2pdf()
        .then((html2pdf) => html2pdf()
          .from(chart)
          .set({
            ...HTML_2_PDF_OPTIONS,
            html2canvas: {
              ...HTML_2_CANVAS_OPTIONS,
              windowWidth: chart.scrollWidth,
              width: chart.scrollWidth,
              windowHeight: chart.scrollHeight,
              height: chart.scrollHeight,
            },
          })
          .save("chart.pdf"))
        .catch(throwError);
    }
  };

  const openDialog = (observations: Observation[]): void => {
    setOpenObservations(observations);
    setObservationsDialogIsOpen(true);
  };

  return (
    <>
      <Dialog isOpen={observationsDialogIsOpen()} onClose={() => setObservationsDialogIsOpen(false)}>
        <For
          each={openObservations()}
          children={(observation) => (
            <ExistingObservation {...observation} />
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
                                    .filter((observation) =>
                                      DateTime.fromISO(observation.datetime).hasSame(dayDateTime, "day"))
                                    .sort((a, b) => a.datetime.localeCompare(b.datetime)))}
                                  class="clickable"
                                >
                                  <span class="chart-element">{DateTime.fromISO(day).toFormat("MM/dd")}</span>
                                  <br />
                                  <strong class="chart-element temperature">
                                    {dayInfo().temperature}
                                  </strong>
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
              <input type="button" value="Print Chart" onClick={printChart} />
            </>
            )
      }
    </>
  );
}

export default Chart;
