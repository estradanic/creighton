import { createMemo, createSignal, For, Index, JSX } from "solid-js";
import { DateTime } from "luxon";
import byCycle from "../functions/byCycle";
import byDay from "../functions/byDay";
import infoForDay, { Info } from "../functions/infoForDay";
import { observations, loading } from "../stores/ObservationsStore";
import Dialog from "../components/Dialog";
import { Observation } from "../types/ObservationTypes";
import ExistingObservation from "../components/ExistingObservation";
import html2pdf from "../stores/Html2PdfStore";
import { Html2PdfOptions } from "html2pdf.js";
import throwError from "../functions/throwError";
import mucusScore from "../functions/mucusScore";
import postPeakDays from "../functions/postPeakDays";
import findPeakDay from "../functions/findPeakDay";

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

type ChartCellProps = {
  day: string
  dayInfo: Info
  openDialog: (observations: Observation[]) => void
  isPeakDay: boolean
};

function ChartCell (props: ChartCellProps): JSX.Element {
  const dayDateTime = (): DateTime => DateTime.fromISO(props.day);
  return (
    <td
      onClick={() => props.openDialog(observations()
        .filter((observation) =>
          DateTime.fromISO(observation.datetime).hasSame(dayDateTime(), "day"))
        .sort((a, b) => a.datetime.localeCompare(b.datetime)))}
      class={`clickable ${props.isPeakDay ? "peak-day" : ""}`}
    >
      {props.dayInfo.mucusScore > 0 &&
        <div class="bar" style={{ top: `${100 - props.dayInfo.mucusScore / 16 * 100}%` }} />
      }
      <span class="chart-element">{DateTime.fromISO(props.day).toFormat("MM/dd")}</span>
      <br />
      <strong class="chart-element temperature">
        {props.dayInfo.temperature}
      </strong>
      <br />
      <span class={`stamp ${props.dayInfo.stamp} chart-element`}>&nbsp;&nbsp;&nbsp;</span>
      <br />
      <span class="chart-element">
        <span class="chart-abbreviation">{props.dayInfo.abbreviation}</span>
      </span>
      <br />
      <span class="chart-element">
        <i>{props.dayInfo.times > 0 ? `x${props.dayInfo.times}` : <br />}</i>
        <span class={`direction ${props.dayInfo.direction}`} />
        {props.dayInfo.intercourse && <span class="intercourse">💞</span>}
        {props.dayInfo.pms && <span>😢</span>}
      </span>
    </td>
  );
}

type ChartRowProps = {
  cycle: Record<string, Observation[]>
  openDialog: (observations: Observation[]) => void
  isComplete: boolean
};

function ChartRow (props: ChartRowProps): JSX.Element {
  const dayInfos = createMemo(() => Object.keys(props.cycle).reduce<Record<string, Info>>((acc, day) => {
    acc[day] = infoForDay(observations(), DateTime.fromISO(day));
    return acc;
  }, {}));

  const actualPeakDay = createMemo(() => findPeakDay(dayInfos()));
  const _mucusScore = createMemo(() => mucusScore(dayInfos(), actualPeakDay()));
  const _postPeakDays = createMemo(() => postPeakDays(props.cycle, actualPeakDay()));

  return (
    <tr>
      <For
        each={Object.keys(props.cycle)}
        children={(day, i) => (
          <ChartCell
            dayInfo={dayInfos()[day]}
            day={day}
            openDialog={props.openDialog}
            isPeakDay={actualPeakDay() === day && props.isComplete}
          />
        )}
      />
      {
        actualPeakDay() && props.isComplete &&
          <td class="chart-metadata">
            <span class="chart-element"><strong>MSC:</strong> {_mucusScore()}</span>
            <br />
            <span class="chart-element"><strong>PPD:</strong> {_postPeakDays()}</span>
          </td>
      }
    </tr>
  );
}

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
          .save(`my_cycle_tracker_${DateTime.now().toUnixInteger()}.pdf`))
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
                      children={(cycle, index) => (
                        <ChartRow
                          cycle={cycle}
                          isComplete={index() + 1 < _byCycle().length}
                          openDialog={openDialog}
                        />
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
