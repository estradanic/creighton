import { Accessor, createSignal, onMount, Setter } from "solid-js";
import Parse from "parse";
import { Observation } from "../types/ObservationTypes";
import throwError from "../functions/throwError";

const [observations, setObservations] = createSignal<Observation[]>([]);
const [loading, setLoading] = createSignal(true);

export type ObservationsStoreReturn = {
  observations: Accessor<Observation[]>
  loading: Accessor<boolean>
  setObservations: Setter<Observation[]>
  setLoading: Setter<boolean>
};

const ObservationsStore = (): ObservationsStoreReturn => {
  onMount(() => {
    if (!observations()?.length) {
      new Parse.Query<Parse.Object<Observation>>("observation")
        .descending("datetime")
        .limit(500)
        .find()
        .then((results) => setObservations(results.map((result) => ({ ...result.attributes, id: result.id }))))
        .catch(throwError)
        .finally(() => setLoading(false));
    }
  });

  return {
    observations,
    loading,
    setObservations,
    setLoading,
  };
};

export default ObservationsStore;
