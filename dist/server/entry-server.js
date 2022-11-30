import { ssr, ssrHydrationKey, ssrAttribute, escape, createComponent, mergeProps, renderToString } from "solid-js/web";
import { DateTime } from "luxon";
import { createSignal, createMemo, onMount, For } from "solid-js";
const App$1 = "";
const _tmpl$$a = ["<label", ' for="color">Color</label>'], _tmpl$2$8 = ["<select", ' name="color"', "", '><option value="clear">Clear</option><option value="white">White</option><option value="yellow">Yellow</option><option value="green">Green</option><option value="brown">Brown</option><option value="red">Red</option><option value="pink">Pink</option></select>'];
function ColorField({
  color,
  disabled = () => false
}) {
  return [ssr(_tmpl$$a, ssrHydrationKey()), ssr(_tmpl$2$8, ssrHydrationKey(), ssrAttribute("value", escape(color, true), false), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$9 = ["<label", ' for="datetime">Date/Time</label>'], _tmpl$2$7 = ["<input", ' type="datetime-local" name="datetime"', "", ">"];
function DatetimeField({
  datetime,
  disabled = () => false,
  setDatetime
}) {
  return [ssr(_tmpl$$9, ssrHydrationKey()), ssr(_tmpl$2$7, ssrHydrationKey(), ssrAttribute("value", escape(datetime.toFormat("yyyy-MM-dd'T'HH:mm"), true), false), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$8 = ["<label", ' for="feeling">Feeling</label>'], _tmpl$2$6 = ["<select", ' name="feeling"', "", '><option value="dry">Dry</option><option value="smooth">Smooth</option><option value="lubricative">Lubricative</option></select>'];
function FeelingField({
  feeling,
  disabled = () => false
}) {
  return [ssr(_tmpl$$8, ssrHydrationKey()), ssr(_tmpl$2$6, ssrHydrationKey(), ssrAttribute("value", escape(feeling, true), false), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$7 = ["<label", ' for="notes">Notes</label>'], _tmpl$2$5 = ["<textarea", ' name="notes"', "", "></textarea>"];
function NotesField({
  notes,
  disabled = () => false
}) {
  var _a;
  return [ssr(_tmpl$$7, ssrHydrationKey()), ssr(_tmpl$2$5, ssrHydrationKey(), ssrAttribute("value", (_a = escape(notes, true)) != null ? _a : "", false), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$6 = ["<label", ' for="stickiness">Stickiness</label>'], _tmpl$2$4 = ["<select", ' name="stickiness"', "", '><option value="none">None (Could not pick up)</option><option value="low">Low (0 - 1/2 inch)</option><option value="tacky">Tacky (1/2 - 3/4 inch)</option><option value="sticky">Sticky (3/4 - 1 inch)</option></select>'];
function StickinessField({
  stickiness,
  disabled = () => false
}) {
  return [ssr(_tmpl$$6, ssrHydrationKey()), ssr(_tmpl$2$4, ssrHydrationKey(), ssrAttribute("value", escape(stickiness, true), false), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$5 = ["<label", ' for="submit"></label>'], _tmpl$2$3 = ["<input", ' type="submit" name="submit"', ' class="submit">'];
function Submit({
  disabled = () => false
}) {
  return [ssr(_tmpl$$5, ssrHydrationKey()), ssr(_tmpl$2$3, ssrHydrationKey(), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$4 = ["<label", ' for="viscosity">Viscosity</label>'], _tmpl$2$2 = ["<select", ' name="viscosity"', "", '><option value="watery">Watery</option><option value="thin">Thin</option><option value="medium">Medium</option><option value="thick">Thick</option></select>'];
function ViscosityField({
  viscosity,
  disabled = () => false
}) {
  return [ssr(_tmpl$$4, ssrHydrationKey()), ssr(_tmpl$2$2, ssrHydrationKey(), ssrAttribute("value", escape(viscosity, true), false), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$3 = ["<label", ' for="menstruation">Menstruation</label>'], _tmpl$2$1 = ["<select", ' name="menstruation"', "", '><option value="none">None</option><option value="spotting">Spotting</option><option value="light">Light</option><option value="medium">Medium</option><option value="heavy">Heavy</option></select>'];
function MenstruationField({
  menstruation,
  disabled = () => false
}) {
  return [ssr(_tmpl$$3, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey(), ssrAttribute("value", escape(menstruation, true), false), ssrAttribute("disabled", disabled(), true))];
}
const _tmpl$$2 = ["<div", ' class="', '"><h3>', '</h3><h3><span class="', '">&nbsp;&nbsp;&nbsp;</span><!--#-->', '<!--/--></h3><div class="edit-cancel"><input type="button"', ' value="Edit"><input type="button"', ' value="Cancel"></div><form method="post" action="existing-observation"><input type="hidden" name="id"', "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", '<!--/--></form><form method="post" action="delete-observation"><input type="hidden" name="id"', '><label for="delete"></label><input type="submit" value="Delete" class="delete"', "></form></div>"];
const isPeakMucus = ({
  feeling,
  stickiness
}) => {
  return feeling === "lubricative" || stickiness === "sticky" || stickiness === "tacky";
};
const isMenstruation = ({
  menstruation
}) => {
  return menstruation !== "none";
};
function ExistingObservation({
  id,
  feeling,
  color,
  stickiness,
  viscosity,
  datetime,
  notes,
  menstruation,
  observations,
  index
}) {
  const [disabled, setDisabled] = createSignal(true);
  const observationsByDay = createMemo(() => {
    const observationsByDay2 = {};
    for (const observation of observations()) {
      const day = DateTime.fromISO(observation.datetime).toISODate();
      if (!observationsByDay2[day]) {
        observationsByDay2[day] = [];
      }
      observationsByDay2[day].push(observation);
    }
    for (const day of Object.keys(observationsByDay2)) {
      const nextDay = DateTime.fromISO(day).plus({
        days: 1
      }).toISODate();
      if (!observationsByDay2[nextDay]) {
        observationsByDay2[nextDay] = [];
      }
    }
    return observationsByDay2;
  });
  const abbreviation = createMemo(() => {
    return "TBD";
  });
  const stamp = createMemo(() => {
    var _a, _b, _c;
    const dateTime = DateTime.fromISO(datetime);
    const day = dateTime.toISODate();
    const dayBefore = dateTime.minus({
      days: 1
    }).toISODate();
    const secondDayBefore = dateTime.minus({
      days: 2
    }).toISODate();
    const thirdDayBefore = dateTime.minus({
      days: 3
    }).toISODate();
    if (isMenstruation({
      menstruation
    })) {
      return "red";
    }
    for (const observation of observationsByDay()[day]) {
      if (isMenstruation(observation)) {
        return "red";
      }
    }
    if (isPeakMucus({
      feeling,
      stickiness
    })) {
      return "white";
    }
    for (const observation of observationsByDay()[day]) {
      if (isPeakMucus(observation)) {
        return "white";
      }
    }
    for (const observation of (_a = observationsByDay()[dayBefore]) != null ? _a : []) {
      if (isPeakMucus(observation)) {
        return "green-baby";
      }
    }
    for (const observation of (_b = observationsByDay()[secondDayBefore]) != null ? _b : []) {
      if (isPeakMucus(observation)) {
        return "green-baby";
      }
    }
    for (const observation of (_c = observationsByDay()[thirdDayBefore]) != null ? _c : []) {
      if (isPeakMucus(observation)) {
        return "green-baby";
      }
    }
    return "green";
  });
  return ssr(_tmpl$$2, ssrHydrationKey(), `observation ${escape(DateTime.fromISO(datetime).weekdayLong, true)}`, escape(DateTime.fromISO(datetime).toFormat("EEEE MMM dd, yyyy @ t")), `stamp ${escape(stamp(), true)}`, escape(abbreviation()), ssrAttribute("disabled", !disabled(), true), ssrAttribute("disabled", disabled(), true), ssrAttribute("value", escape(id, true), false), escape(createComponent(MenstruationField, {
    disabled,
    menstruation
  })), escape(createComponent(FeelingField, {
    disabled,
    feeling
  })), escape(createComponent(ColorField, {
    disabled,
    color
  })), escape(createComponent(StickinessField, {
    disabled,
    stickiness
  })), escape(createComponent(ViscosityField, {
    disabled,
    viscosity
  })), escape(createComponent(DatetimeField, {
    disabled,
    get datetime() {
      return DateTime.fromISO(datetime);
    },
    setDatetime: () => console.log("uh oh")
  })), escape(createComponent(NotesField, {
    disabled,
    notes
  })), escape(createComponent(Submit, {
    disabled
  })), ssrAttribute("value", escape(id, true), false), ssrAttribute("disabled", disabled(), true));
}
const _tmpl$$1 = ["<div", ' class="observation"><h3>New Observation</h3><form method="post" action="new-observation"><input type="hidden" name="id"', "><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></form></div>"];
function NewObservation({
  id
}) {
  const [datetime, setDatetime] = createSignal(DateTime.now());
  return ssr(_tmpl$$1, ssrHydrationKey(), ssrAttribute("value", escape(id(), true), false), escape(createComponent(MenstruationField, {})), escape(createComponent(FeelingField, {})), escape(createComponent(ColorField, {})), escape(createComponent(StickinessField, {})), escape(createComponent(ViscosityField, {})), escape(createComponent(DatetimeField, {
    get datetime() {
      return datetime();
    },
    setDatetime
  })), escape(createComponent(NotesField, {})), escape(createComponent(Submit, {})));
}
const _tmpl$ = ["<h1", ">Creighton Observation Tracker</h1>"], _tmpl$2 = ["<h2", `>Today's highlight color: <span class="`, '">', "</span></h2>"], _tmpl$3 = ["<h2", ">No observations yet.</h2>"];
function App() {
  const [observations, setObservations] = createSignal([]);
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
  return [ssr(_tmpl$, ssrHydrationKey()), ssr(_tmpl$2, ssrHydrationKey(), `highlight-color ${escape(DateTime.now().weekdayLong, true)}`, escape(DateTime.now().weekdayLong)), createComponent(NewObservation, {
    id: nextIndex
  }), createComponent(For, {
    get each() {
      return observations().sort((a, b) => b.datetime.localeCompare(a.datetime));
    },
    get fallback() {
      return ssr(_tmpl$3, ssrHydrationKey());
    },
    children: (observation, index) => createComponent(ExistingObservation, mergeProps({
      index,
      observations
    }, observation))
  })];
}
function render() {
  const html = renderToString(() => createComponent(App, {}));
  return {
    html
  };
}
export {
  render
};
