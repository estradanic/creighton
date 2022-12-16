import "./App.css";
import { JSX, onMount } from "solid-js";
import { Routes, Route, Link } from "@solidjs/router";
import Parse from "parse";
import Login from "./views/Login";
import Observations from "./views/Observations";
import Chart from "./views/Chart";

Parse.serverURL = "https://creighton.b4a.app";
Parse.initialize(
  "PptpNlgdw5ZmgpHZwthVvLTUaVlQMkF0919cu1In",
  "WpWOMB0WXQ1vGl3EnSNi657F88BL2ClLSPgJAmgN",
);

function App (): JSX.Element {
  onMount(() => {
    if (Parse.User.current() && window.location.href.includes("/login")) window.location.href = "/observations";
    else if (!Parse.User.current() && !window.location.href.includes("/login")) window.location.href = "/login";
  });
  return (
    <>
      <h1>Creighton Observation Tracker</h1>
      <div class="link-container">
        <Link href="/observations">Observations</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link href="/chart">Chart</Link>
        <span>&nbsp;|&nbsp;</span>
        <Link
          href="#"
          onClick={() => {
            Parse.User.logOut().then(() => { window.location.href = "/login"; }).catch(() => {});
          }}
        >
          Logout
        </Link>
      </div>
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
