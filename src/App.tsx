import Parse from "parse";
import {Routes, Route} from "@solidjs/router";
import "./App.css";
import Login from "./views/Login";
import Observations from "./views/Observations";

Parse.serverURL = "https://creighton.b4a.app";
Parse.initialize(
  "PptpNlgdw5ZmgpHZwthVvLTUaVlQMkF0919cu1In",
  "WpWOMB0WXQ1vGl3EnSNi657F88BL2ClLSPgJAmgN",
);

function App() {
  return (
    <>
      <h1>Creighton Observation Tracker</h1>
      <Routes>
        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/observations" component={Observations} />
      </Routes>
    </>
  );
}

export default App;
