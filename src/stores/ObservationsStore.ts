import { createSignal } from "solid-js";
import Parse from "parse";
import { Observation } from "../types/ObservationTypes";
import throwError from "../functions/throwError";

const [_observations, _setObservations] = createSignal<Observation[]>([]);
const [_loading, setLoading] = createSignal(false);
const [gotObservations, setGotObservations] = createSignal(false);
export const [loadAll, setLoadAll] = createSignal(false);

export const observations = (): Observation[] => {
  if (!loading() && !gotObservations()) {
    setLoading(true);
    if (loadAll()) {
      new Parse.Query<Parse.Object<Observation>>("observation")
        .findAll()
        .then((results) => setObservations(results
          .sort((a, b) => b.get("datetime").localeCompare(a.get("datetime")))
          .map((result) => ({ ...result.attributes, id: result.id }))))
        .catch(throwError)
        .finally(() => {
          setGotObservations(true);
          setLoading(false);
        });
    } else {
      new Parse.Query<Parse.Object<Observation>>("observation")
        .limit(400)
        .descending("datetime")
        .find()
        .then((results) => setObservations(results
          .map((result) => ({ ...result.attributes, id: result.id }))))
        .catch(throwError)
        .finally(() => {
          setGotObservations(true);
          setLoading(false);
        });
    }
  }
  return _observations();
};

export const loading = _loading;
export const setObservations = _setObservations;
export function refresh (): void {
  setGotObservations(false);
}
