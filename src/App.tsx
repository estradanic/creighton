import {Routes, Route} from "@solidjs/router";
import "./App.css";
import Observations from "./views/Observations";

function App() {
  return (
    <>
      <h1>Creighton Observation Tracker</h1>
      <Routes>
        <Route path="/" component={Observations} />
      </Routes>
    </>
  );
}

export default App;
