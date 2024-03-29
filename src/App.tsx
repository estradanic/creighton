import "./App.css";
import { JSX, Show, lazy, onMount } from "solid-js";
import { Routes, Route, Link } from "@solidjs/router";
import Parse from "parse";
import throwError from "./functions/throwError";
import { loadAll, setLoadAll, refresh } from "./stores/ObservationsStore";

const Observations = lazy(async () => await import("./views/Observations"));
const Login = lazy(async () => await import("./views/Login"));
const Chart = lazy(async () => await import("./views/Chart"));

Parse.serverURL = "https://creighton.b4a.app";
Parse.initialize(
  "PptpNlgdw5ZmgpHZwthVvLTUaVlQMkF0919cu1In",
  "WpWOMB0WXQ1vGl3EnSNi657F88BL2ClLSPgJAmgN",
);

// TODO: Signalize this
function isOnLoginPage (): boolean {
  return window.location.href.split("/").filter((hrefPart) => {
    return hrefPart === "observations" || hrefPart === "chart";
  }).length === 0;
}

function App (): JSX.Element {
  onMount(() => {
    if (Parse.User.current() && isOnLoginPage()) {
      window.location.href = "/observations";
    } else if (!Parse.User.current() && !isOnLoginPage()) {
      window.location.href = "/login";
    }
  });
  return (
    <>
      <h1>My Cycle Tracker</h1>
      <div class="top-element-container">
        <Link href="/observations">Observations</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link href="/chart">Chart</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link
          href="#"
          onClick={() => {
            Parse.User.logOut().catch(throwError);
          }}
        >
          Logout
        </Link>
      </div>
      <Show when={!isOnLoginPage()}>
        <div class="top-element-container">
          <label for="load-all">Load All Observations (Slow)</label>
          <input
            type="checkbox"
            name="load-all"
            checked={loadAll()}
            onChange={(e) => {
              setLoadAll(e.currentTarget.checked);
              refresh();
            }}
          />
        </div>
      </Show>
      <Routes>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/observations" component={Observations} />
        <Route path="/chart" component={Chart} />
      </Routes>
    </>
  );
}

export default App;
