import { Accessor, createSignal, onMount, Setter } from "solid-js";
import Parse from "parse";
import { Observation } from "../types/ObservationTypes";

const [observations, setObservations] = createSignal<Observation[]>([]);
const [loading, setLoading] = createSignal(true);

export type ObservationsStoreReturn = {
  observations: Accessor<Observation[]>
  loading: Accessor<boolean>
  setObservations: Setter<Observation[]>
};

const observationsStore = (): ObservationsStoreReturn => {
  onMount(() => {
    new Parse.Query<Parse.Object<Observation>>("observation").findAll()
      .then((results) => setObservations(results.map((result) => ({ ...result.attributes, id: result.id }))))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  });

  return {
    observations,
    loading,
    setObservations,
  };
};

export default observationsStore;
